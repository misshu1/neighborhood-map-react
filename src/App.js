import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import './App.css';
import { places } from './places.js';
// Style used for map https://snazzymaps.com/style/127403/no-label-bright-colors
import { mapStyle } from './mapStyle';

let newMarkers = [];
let infoWindow = [];
class App extends Component{
    state = {
        loadSuccess: true,
        query: '',
        map: {},
        places: places,
        placeInfo: []
    };

    // Update query when user type on search field
    updatequery =(query) => {
        this.setState({query: query})
    };
  
    updateData = (newData) => {
        this.setState({ placeInfo: newData});
        return this.state.placeInfo;
    };
      
    componentWillReceiveProps({isScriptLoadSucceed}){
        // Error handler for script
        if (isScriptLoadSucceed) {
          // Create map
          const map = new window.google.maps.Map(document.getElementById('map'), 
          {zoom: 15,
            // Load map at this location
            center: new window.google.maps.LatLng(45.105083, 24.364982),
            styles: mapStyle
        });
          this.setState({map:map});
        }
        else {
          // Error message
          console.log("Google map failed to load!");
          this.setState({loadSuccess: false})
        }
      };

 getUser = (user) => {
     return `${user.name}`
 }

      componentDidUpdate(){
        // Filter the locations depending on the user input 
        const {places, query, map, placeInfo} = this.state;
        let showingLocations = places
        if (query) {
          const match = new RegExp(escapeRegExp(query),'i')
          showingLocations = places.filter((location)=> match.test(location.name))
        }
        else{
          showingLocations = places;
        }
        newMarkers.forEach( (marker) => { marker.setMap(null) });
        // Clear the markers and the infoWindow arrays
        newMarkers = [];
        infoWindow = [];
        showingLocations.map((marker,index)=> {
        

        // let markerInfo = placeInfo.filter(info => info[0].response.venue.id === marker.venueID).map(content => {
        //     if(content.length === 0) { 
        //         return 'We don\'t have any information about this place'
        //     } else if (content !== '') {
        //         return `${placeInfo.venue.location.country}
        //         Lat ${content.venue.labeledLatLngs.lat.toFixed(5)}
        //         Long ${content.venue.labeledLatLngs.lng.toFixed(5)}
        //     `
        //     } else {
        //         return 'We don\'t have any information about this place'
        //     }
        // });
        let markerInfo = console.log(placeInfo)
                    
        let content =
        `<div tabIndex="0" class="infowindow">
            <h4>${marker.name}</h4>
            <p>${markerInfo}</p>
        </div>`
          //Add the content to infoWindow
          let addInfoWindow= new window.google.maps.InfoWindow({
            content: content,
          });
          //Extend the map bound
          let bounds = new window.google.maps.LatLngBounds();
          //Create the marker
          let addmarker = new window.google.maps.Marker({
            map: map,
            position: marker,
            animation: window.google.maps.Animation.DROP,
            name : marker.name
          });
          //Add the marker to the list of marker
          newMarkers.push(addmarker);
          infoWindow.push(addInfoWindow);
          addmarker.addListener('click', function() {
              //Close windows before open the another
              infoWindow.forEach(info => { info.close() });
              addInfoWindow.open(map, addmarker);
              //Clear he animaiton before add the new one
              if (addmarker.getAnimation() !== null) {
                addmarker.setAnimation(null);
              } else {
                //Add the aniamtion when the marker is clicked
                addmarker.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => {addmarker.setAnimation(null);}, 400)
              }
            })
          //Bounds
          newMarkers.forEach((m)=>
            bounds.extend(m.position))
          map.fitBounds(bounds)
        })
      }
    
      
    componentDidMount(){

        // const url = `https://api.foursquare.com/v2/venues/${place.venueID}?&client_id=1DYY3JEVTWCPWVVWMEMH5B1AHNFFVYI1EK2L2NTR1EA5AE40&client_secret=NWXRKVQ2FTAHONOWOL0TWJZTL5RC3101JUFG24A3A0SYDIJF&v=20180818`
       const url = `https://randomuser.me/api/?results=8`
        console.log(url)
        fetch(url)
            .then(data => {
            if(data.ok) {
                return data.json();
            } else {
                throw new Error(data.statusText)
            }
            })
            .then(data => {
                let newData = [data];
              return  this.updateData(newData);            
            })
            .catch(err => {
                console.log(err);
            })
        }
    
      //Trigger a specific marker when the list item is clicked
      listItem = (item) => {
        let selected = newMarkers.filter((currentOne)=> currentOne.name === item.name)
        window.google.maps.event.trigger(selected[0], 'click');
    
      }
      // Accessibility support from https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
      handleKeyPress(target,item,e) {
        if(item.charCode===13){
         this.listItem(target,e)
       }
     }

    render(){
        const {places, query, loadSuccess} = this.state;

        let showingLocations;
        if (query){
          const match = new RegExp(escapeRegExp(query),'i')
          showingLocations = places.filter((location)=> match.test(location.name))
        }
        else{
          showingLocations=places;
        }
        showingLocations.sort(sortBy('name'))
        return(
            //Show the map if request successful
            loadSuccess ? (
       <div>
           <div id="container">
               <div id="map" role="application" tabIndex="-1"  aria-label="Restaurante Ramnicu Valcea"></div>
            {/* Menu with all locations on map */}
            <div id="menu">
                <div className="search-container">
                    <input 
                    id="search-input" 
                    type='text'
                    placeholder='Search'
                    value={ query }
                    onChange={ (event)=> this.updatequery(event.target.value) }
                    role="search"
                    aria-labelledby="Search For a Location"
                    tabIndex="1"
                    />
                </div>
                <div className="list-menu">
                    <ul 
                    aria-labelledby="list of locations" 
                    tabIndex="1"
                    >
                        {showingLocations.map((getLocation, index)=>
                            <li 
                            id={ getLocation.name }
                            onKeyPress={ this.handleKeyPress.bind(this,getLocation) } 
                            onClick={ this.listItem.bind(this,getLocation) }
                            key={ index } 
                            tabIndex={ index+2 }
                            area-labelledby={`View details for ${ getLocation.name }`} 
                            >
                            { getLocation.name }
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            </div>
        </div> 
        ) : (
            <div>
            <h1>Map is not working right now, try again later.</h1>
            </div>
            )
       )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAv9IpffqmZCDYbtrsnUYpRlhwRKgw-pdA"]
)(App)

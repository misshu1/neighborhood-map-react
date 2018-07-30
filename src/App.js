import React, { Component } from 'react';
//import scriptLoader from 'react-async-script-loader';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { places } from './places';
import './App.css';
import ShowMap from './ShowMap';

let markers =[];
class App extends Component {
  state = {
    places: places,
    map: {},
    query: '',
    selectedMarker: '',
    loadSuccess: 'true'
  };

  updatequery = (query) => {
    this.setState({query: query})
  };

  // componentWillReceiveProps({mapLoaded}){
  //   //Make sure the script is loaded
  //   if (mapLoaded) {
  //     //Creating the Map
  //     const map = new window.google.maps.Map(document.getElementById('map'), {
  //       zoom: 15,
  //       //Giving an initial locaiton to start
  //       center: new window.google.maps.LatLng(39.956623,-75.189933)
  //       });
  //     this.setState({map:map});
  //   }
  //   else {
  //     //Handle the error
  //     console.log("Error:Cann't Load Google Map!");
  //     this.setState({loadSuccess: false})
  //   }
  // }



  
//   handleKeyPress(target,item,e) {
//     if(item.charCode){
//      this.listItem(target,e)
//    }
//  };

//  listItem = (item) => {
//     let selected = markers.filter((currentOne)=> currentOne.name === item.name)
//     window.google.maps.event.trigger(selected[0], 'click');
//   };

  render() {
    const {places, query, loadSuccess} = this.state;

    let showingLocations;
    if (query){
      const match = new RegExp(escapeRegExp(query),'i')
      showingLocations = places.filter((place)=> match.test(place.name))
    }
    else{
      showingLocations=places
    };
    
    showingLocations.sort(sortBy('name'))
 return (
      //Show the map if request successful
      loadSuccess ? (
        <div>
            <div id="container">
                <div id="map-container" role="application" tabIndex="-1">
            <ShowMap />
            </div>
            {/*List view that has input and list of locaitons*/}
            <div id="menu">
                <div className="search-container">
                    <input id="search-input" className='form-control' type='text'
                    placeholder='Search'
                    value={query}
                    onChange={(event)=> this.updatequery(event.target.value)}
                    role="search"
                    aria-labelledby="Search For a Location"
                    tabIndex="1"/>
                </div>
                <div className="list-menu">
            <ul aria-labelledby="list of locations" tabIndex="1">
                {/*JSON.stringify(this.state.query)*/}
                {showingLocations.map((getLocation, index)=>
                <li key={index} tabIndex={index+2}
                area-labelledby={`View details for ${getLocation.name}`} >{getLocation.name}</li>)}
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
        );
  }
}

export default App;

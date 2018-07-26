import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { places } from './places';
import './App.css';

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

  componentWillReceiveProps({isScriptLoadSucceed}) {
    // Conditional to initialize the map when the script loads
    if (isScriptLoadSucceed) {

      // Initialize Google Maps    
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.107158, lng: 24.365482 },
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: false
      });
    this.setState({
      map: map
    })
    console.log(map)
    } else {
      alert('Can\'t load the map right now. Try again later!');
    }
  }






  

  render() {
    const {places, query, requestSuccess} = this.state;

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
    
        <div>
            <div id="container">
                <div id="map-container" role="application" tabIndex="-1">
                <div id="map" role="region" aria-label="Primaria Ramnicu Valcea"></div>
            </div>
   
            </div>
        </div> 

        );
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAv9IpffqmZCDYbtrsnUYpRlhwRKgw-pdA`]
)(App);

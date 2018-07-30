import React, { Component } from 'react'
import { places } from './places';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

let newmarkers = [];
class ShowMap extends Component {
  state={
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: []
}
onMarkerClick=(props, marker, event)=>{
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
});
}

UpdateMarker=(marker)=>{
  newmarkers.push(marker)
  console.log(newmarkers)
  this.setState({  		
    markers:newmarkers
  })
}

render() {


return (
  <Map google={this.props.google} 
    initialCenter={{
        lat: 45.107158,
        lng: 24.365482
      }}
    zoom={16}>


    
    <InfoWindow
      marker={this.state.activeMarker}
      visible={this.state.showingInfoWindow}>
        <div>
          <h3>{this.state.selectedPlace.name}</h3>
          <p>{this.state.selectedPlace.address}</p>
          <button>Details</button>
        </div>
    </InfoWindow> 
          
  </Map>
)}
}

 export default GoogleApiWrapper({
	apiKey: "AIzaSyAv9IpffqmZCDYbtrsnUYpRlhwRKgw-pdA"
  }) (ShowMap)

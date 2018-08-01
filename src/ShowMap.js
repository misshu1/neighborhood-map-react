import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

let newMarkers = [];
class ShowMap extends Component {
componentWillMount(){
    {this.props.menuClick(newMarkers)}
}
render() {
    const markers = this.props.places.map((marker, index) => (
        <Marker
          key={index}
          name={marker.name}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={this.props.markerClick}
        />
    ));
    newMarkers.push(markers);
return (
    <Map google={this.props.google} 
        initialCenter={{
            lat: 45.107158,
            lng: 24.365482
        }}
        onClick={this.props.onMapClicked}    
        zoom={15}
    >
    
    {/* Access the newMarkers variable from App.js */}

    {/* Display the markers */}
    {newMarkers}

        <InfoWindow
        marker={this.props.activeMarker}
        visible={this.props.showingInfoWindow}
        >
            <div>
            <h3>{this.props.selectedPlace.name}</h3>
            {/* <p>{ Info about place foursquare }</p> */}
            </div>
        </InfoWindow> 
          
    </Map>
)}
}

 export default GoogleApiWrapper({
	apiKey: "AIzaSyAv9IpffqmZCDYbtrsnUYpRlhwRKgw-pdA"
  }) (ShowMap)

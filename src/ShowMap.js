import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class ShowMap extends Component {
render() {
    let newMarkers = [];
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

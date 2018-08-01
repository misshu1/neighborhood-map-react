import React, { Component } from 'react';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { places } from './places';
import './App.css';
import ShowMap from './ShowMap';

class App extends Component {
    state = {
        places: places,
        query: '',
        loadSuccess: true,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: []
    };

    updatequery = query => this.setState({query: query});

    markerClick = (props, marker) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    evt = event => event.target;

    menuClick = (newMarkers) => {
        if(this.evt() === newMarkers.target) {
            this.markerClick();
        }
    };

    onMapClicked = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            });
        }
    };

render() {
    const {places, query, loadSuccess, showingInfoWindow, activeMarker, selectedPlace} = this.state;

    let showingLocations;
    if (query) {
      const match = new RegExp(escapeRegExp(query),'i')
      showingLocations = places.filter((place)=> match.test(place.name))
    }
    else {
      showingLocations=places
    };
    
    showingLocations.sort(sortBy('id'));
 return (
      //Show the map if request successful
      loadSuccess ? (
        <div>
            <div id="container">
                <div id="map-container" role="application" tabIndex="-1">
            <ShowMap 
            menuClick={ this.menuClick }
            places={ places }
            showingInfoWindow={ showingInfoWindow }
            activeMarker={ activeMarker }
            selectedPlace={ selectedPlace }
            markerClick={ this.markerClick }
            onMapClicked={ this.onMapClicked }
            />
            </div>
            {/*List view that has input and list of locaitons*/}
            <div id="menu">
                <div className="search-container">
                    <input 
                    id="search-input" 
                    className='form-control' 
                    type='text'
                    placeholder='Search'
                    value={ query }
                    onChange={(event)=> this.updatequery(event.target.value)}
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
                        {/*JSON.stringify(this.state.query)*/}
                        {showingLocations.map((getLocation, index)=>
                        <li 
                        id={ getLocation.name }
                        onClick={ this.evt.bind(this) }
                        onMouseOver={ this.menuClick}
                        key={index} 
                        tabIndex={ index+2 }
                        area-labelledby={`View details for ${ getLocation.name }`} 
                        >
                        { getLocation.name }
                        </li>)}
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

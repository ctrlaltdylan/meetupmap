import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = (props) => {

    return (
      <Map google={props.google} zoom={10} onClick={props.onMapClick} initialCenter={{
        lat: 47.620422,
        lng: -122.349358
      }}>
        { (props.events.length > 0) ? 
            props.events.filter(event => { return event.venue }).map(function(event) {
              return (
                <Marker 
                  key={event.id}
                  position={{ lat: event.venue.lat, lng: event.venue.lon }} 
                  onClick={(e) => { props.onMarkerClick(event.id) }}
                />
              )
            })
          : ''}
      </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD-TGTulSS4x7Zy29UG7hdM-loTC3D9wi4'
})(MapContainer)


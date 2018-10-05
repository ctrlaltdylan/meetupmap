import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = (props) => {
    let initialCenter = {
      lat: 47.620422,
      lng: -122.349358
    };

    if(props.selectedEvent && props.selectedEvent.venue) {
      initialCenter.lat = props.selectedEvent.venue.lat;
      initialCenter.lon = props.selectedEvent.venue.lng;
    }

    return (
      <Map google={props.google} zoom={10} onClick={props.onMapClick} initialCenter={initialCenter} mapCenter={initialCenter}>
        { (props.events.length > 0) ? 
            props.events.filter(event => { return event.venue }).map(function(event) {
              let style = {};
              if (event.id == props.selectedEvent.id) {
                style.backgroundColor = 'blue';
              }

              return (
                <Marker 
                  key={event.id}
                  style={style}
                  position={{ lat: event.venue.lat, lng: event.venue.lon }} 
                  onClick={(e) => { props.onMarkerClick(event.id) }}
                  title={event.venue.name}
                />
              )
            })
          : ''}
      </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCrpqRuiRv4Oug4YJn1651fMG_5LJBH8dU'
})(MapContainer)


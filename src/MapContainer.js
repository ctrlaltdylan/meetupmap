import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const renderMarkers = (events, selectedEvent, onMarkerClick) => {

  if(events.length == 0) {
    return;
  }

  if(selectedEvent) {
    return (
      <Marker
        key={selectedEvent.id}
        position={{ lat: selectedEvent.venue.lat, lng: selectedEvent.venue.lon }}
        onClick={(e) => { onMarkerClick(selectedEvent.id) }}
        title={selectedEvent.venue.name}
      />
    );
  }

  return events.filter(event => { return event.venue }).map((event) => {
    return (
      <Marker
        key={event.id}
        position={{ lat: event.venue.lat, lng: event.venue.lon }}
        onClick={(e) => { onMarkerClick(event.id) }}
        title={event.venue.name}
      />
    )
  })
};

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

      <Map 
        google={props.google} 
        zoom={10} 
        onClick={props.onMapClick}
        initialCenter={initialCenter}
        mapCenter={initialCenter}
        style={{ height: '100%', width: '100%' }}>
        { renderMarkers(props.events, props.selectedEvent, props.onMarkerClick) }
      </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCrpqRuiRv4Oug4YJn1651fMG_5LJBH8dU'
})(MapContainer)


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import request from 'request';
import qs from 'querystring';

import LocationSearchInput from './LocationSearchInput';

const style = {
  width: '100%',
  height: '100%'
}

const Event = (props) => {
    return (
      <a key = { props.id } href = { props.link } target = "_self" >
        <div className="event">
          <h3 className="event-title">
            {props.name}
          </h3>
          <p className="event-group">
            hosted by {props.group.name}
          </p>
          <p>
            <span>
              {props.local_date} at {props.local_time}
            </span>
          </p>
          {(props.venue) ?
            <p>
              hosted at {props.venue.name}
            </p>
            : ''}
        </div>
      </a >
    )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      city: {},
      events: [],
      selectedEvent: false
    }
  }

  retrieveMeetups = (state) => {
      const options = {
        url: 'http://localhost:8000/meetups',
      }

      if(state && state.lat && state.lng) {
        options.url = options.url + '?' + qs.stringify({lat: state.lat, lon: state.lng});
      }

      request(options, function(error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.

          body = JSON.parse(body);
          this.setState({
            events: body.events,
            city: body.city,
            loading: false,
            address: '' 
          })
      }.bind(this));
  }

  onLocationSelect = (latLng) => {
    const {lat, lng} = latLng;
    this.setState({
      lat,
      lng
    }, () => {
      this.retrieveMeetups(this.state);
    })
  }

  onMarkerClick = (event_id) => {
    const selectedEvent = this.state.events.filter(event => {
      return event.id == event_id;
    })[0];
    debugger;
    this.setState({
      selectedEvent
    });
  }

  onMapClick = () => {
    this.setState({
      selectedEvent: false
    })
  }

  componentDidMount() {
    this.retrieveMeetups();
  }

  render() {
    return (
      <div className="container">
        <aside>
          <section className="heading">
            <h2>Seattle Tech Meetups</h2>
            <span>
              finally in map view!
            </span>
          </section>
          {/*
          <section>
            <button onClick={() => { this.setRange('today') } } >
              Today
            </button>
            <button onClick={() => { this.setRange('week') } } >
              Week
            </button>
            <button onClick={() => { this.setRange('month') } } >
              Month
            </button>
          </section>
          */}
          <section class="events-container">
            { (this.state.events.length > 0) ? 
                (this.state.selectedEvent) ? 
                  <Event {...this.state.selectedEvent} />
                : this.state.events.map(function(event) {
                  return (
                    <Event {...event} />
                  );
                })
            : ''}
          </section>
        </aside>
        <section>
          <MapContainer
            style={style}
            events={this.state.events}
            city={this.state.city}
            onMarkerClick={this.onMarkerClick}
            onMapClick={this.onMapClick}
          />
        </section>
      </div>
    );
  }
}

export default App;

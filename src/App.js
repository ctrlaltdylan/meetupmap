import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import request from 'request';
import qs from 'querystring';
import LocationSearchInput from './LocationSearchInput';
import Event from './Event';
import moment from 'moment';

const style = {
  width: '100%',
  height: '100%'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingEvents: true,
      city: {},
      events: [],
      selectedEvent: false,
      dateRange: 'month'
    }

  }

  retrieveMeetups = (state) => {
    let options = {
      url: process.env.REACT_APP_MEETUPS_URL || 'http://localhost:8080/meetups' 
    };
    let query = {};

    if(state && state.lat && state.lng) {
      query.lat = state.lat;
      query.lon = state.lng;
    }
    
    if(state && state.dateRange) {
      if (state.dateRange == 'today') {
        query.end_date_range = moment().endOf('day').format('YYYY-MM-DDTHH:mm:00')
      } else if (state.dateRange == 'week') {
        query.end_date_range = moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:00')
      } else {
        // just leave the filter blank
      }
    }

    options.url = options.url + '?' + qs.stringify(query);

    request(options, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        body = JSON.parse(body);
        this.setState({
          events: body.events,
          city: body.city,
          loadingEvents: false,
          address: '' 
        })
    }.bind(this));
  }

  onLocationSelect = (latLng) => {
    const {lat, lng} = latLng;
    this.setState({
      lat,
      lng,
      loadingEvents: true
    }, () => {
      this.retrieveMeetups(this.state);
    })
  }

  setRange = (dateRange) => {
    this.setState({
      dateRange,
      loadingEvents: true
    }, this.retrieveMeetups(this.state));
  }

  onMarkerClick = (event_id) => {
    const selectedEvent = this.state.events.filter(event => {
      return event.id == event_id;
    })[0];

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
            <div>
              <button onClick={() => { this.setRange('today') }} >
                Today
              </button>
              <button onClick={() => { this.setRange('week') }} >
                Week
              </button>
              <button onClick={() => { this.setRange('month') }} >
                Month
              </button>
            </div>
          </section>
          <section className="events-container">
            { (this.state.loadingEvents) ? 
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 
               (this.state.events.length > 0) ? 
                  (this.state.selectedEvent) ? 
                    <Event key={this.state.selectedEvent.id} {...this.state.selectedEvent} />
                  : this.state.events.map(function(event) {
                    return (
                      <Event key={event.id} {...event} />
                    );
                  })
              : ''
            }
          </section>
        </aside>
        <section className="map-wrapper">
          <MapContainer
            style={style}
            events={this.state.events}
            selectedEvent={this.state.selectedEvent}
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

import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import request from 'request';
import qs from 'querystring';
import LocationSearchInput from './LocationSearchInput';
import Event from './Event';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import FiltersModal from './FiltersModal';
import Filters from './Filters';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const style = {
  width: '100%',
  height: '100%'
};

const inital_state = {
  loadingEvents: true,
  city: {},
  events: [],
  selectedEvent: false,
  dateRange: 'month',
  showFilters: false,
  searchAddress: '',
  resettable: false
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = inital_state
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

  // from the react-autocomplete-jawn
  onLocationChange = (searchAddress) => {
    this.setState({ searchAddress });
  };

  // from the react-autocomplete-jawn
  onLocationSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .then((latLng) => {
        // this.onLocationSelect(latLng)
        debugger;
        const {lat, lng} = latLng;
        this.setState({
          lat,
          lng,
          loadingEvents: true
        }, () => {
          this.retrieveMeetups(this.state);
        })
      })
      .catch(error => console.error('Error', error));
  };


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

  resetFilters = () => {
    this.setState(inital_state, this.retrieveMeetups);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if(nextState.resettable) {
      return;
    }
    
    if(nextState.selectedEvent) {
      this.setState({ resettable: true });
    }
  }

  /**
   * Change the state of the Filters modal when in mobile view
   */
  toggleFiltersModal = () => {
    const filterState = !this.state.showFilters;
    this.setState({
      showFilters: filterState
    })
  }

  componentDidMount() {
    this.retrieveMeetups();
  }

  render() {
    return (
      <div className="container">
        <section className="header">
          <h2>Seattle Tech Meetups</h2>
          <span>
            finally in map view!
          </span>
        </section>
        <section className="filters-container">
          <MediaQuery query="(max-device-width: 1224px)">
            <button className="button expanded" onClick={this.toggleFiltersModal}>
              FILTERS
            </button>
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Filters 
              setRange={this.setRange} 
              searchAddress={this.state.searchAddress}
              onLocationSelect={this.onLocationSelect}
              onLocationChange={this.onLocationChange}
              resettable={this.state.resettable}
              resetFilters={this.resetFilters}
            /> 
          </MediaQuery>
        </section>
        <section className="events">
          { (this.state.loadingEvents) ? 
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i> : 
              (this.state.events.length > 0) ? 
                (this.state.selectedEvent) ? 
                  <Event key={this.state.selectedEvent.id} {...this.state.selectedEvent} />
                : this.state.events.map((event) => {
                  return (
                    <Event key={event.id} onSelectedEvent={this.onMarkerClick} {...event} />
                  );
                })
            : ''
          }
        </section>
        <section className="map">
          <MapContainer
            style={style}
            events={this.state.events}
            selectedEvent={this.state.selectedEvent}
            city={this.state.city}
            onMarkerClick={this.onMarkerClick}
            onMapClick={this.onMapClick}
          />
        </section>
        <FiltersModal show={this.state.showFilters} toggle={this.toggleFiltersModal}>
          <Filters 
            setRange={this.setRange}
            searchAddress={this.state.searchAddress}
            onLocationSelect={this.onLocationSelect}
            onLocationChange={this.onLocationChange}
            resettable={this.state.resettable}
            resetFilters={this.resetFilters}
          />
        </FiltersModal>
      </div>
    );
  }
}

export default App;

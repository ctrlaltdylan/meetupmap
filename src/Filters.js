import React, { Component } from 'react';
import LocationField from './LocationField';

const Filters = (props) => {
  return (
    <div className="filters">
      <div className="location-search">
        <LocationField
          address={props.searchAddress}
          onChange={props.onLocationChange}
          onSelect={props.onLocationSelect}
        />
      </div>
      <div className="date-range expanded button-group">
        <button className="button" onClick={() => { props.setRange('today') }} >
          Today
        </button>
        <button className="button" onClick={() => { props.setRange('week') }} >
          Week
        </button>
        <button className="button" onClick={() => { props.setRange('month') }} >
          Month
        </button>
      </div>
      {props.resettable ? 
        <button className="alert button" onClick={props.resetFilters}>
          RESET FILTERS
        </button>
      :''}

    </div>
  );
}

export default Filters;

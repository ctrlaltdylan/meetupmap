import React, { Component } from 'react';

const Filters = (props) => {
  return (
    <div className="filters">
      <div className="location-search">
        <input type="text" />
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
    </div>
  );
}

export default Filters;

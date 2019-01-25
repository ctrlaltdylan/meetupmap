import React, { Component } from 'react';

const Event = (props) => {
  return (
    <div className="event">
      <a key={props.id} onClick={ () => { props.onSelectedEvent(props.id) } }>
        <h3 className="event-title">
          {props.name}
        </h3>
      </a>
      <p className="event-group">
        hosted by <a href={'https://www.meetup.com/' + props.group.urlname} target="_blank">{props.group.name}</a>
      </p>
      <p>
        <span>
          {props.local_date} at {props.local_time}
        </span>
      </p>
      {(props.venue) ?
        <p>
          hosted at <a href={`https://www.google.com/maps/search/?api=1&query=${props.venue.name}`} target="_blank">{props.venue.name}</a>
        </p>
        : ''}
        <div>
      {(props.venue) ?
        <p>
          <a className="button text-white" href={`https://www.google.com/maps/search/?api=1&query=${props.venue.name}`} target="_blank">
            <button className="text-white">
              GET DIRECTIONS
            </button>
          </a>
        </p>
        : ''}
        <a href={props.link} className="button text-white" target="_blank">
          VIEW ON MEETUP
        </a> 
        </div>

    </div>
  )
}

export default Event;

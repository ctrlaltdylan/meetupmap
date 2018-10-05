import React, { Component } from 'react';

const Event = (props) => {
  return (
    <div className="event">
      <a key={props.id} href={props.link} target="_blank">
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
      {(props.venue) ?
        <p>
          <a className="" href={`https://www.google.com/maps/search/?api=1&query=${props.venue.name}`} target="_blank">
            <button>
              GET DIRECTIONS
            </button>
          </a>
        </p>
        : ''}

    </div>
  )
}

export default Event;

import React, { Component } from 'react';

const FiltersModal = (props) => {
  let className = 'filters-modal';

  if(!props.show) {
    className = className + ' hidden';
  }

  return (
    <div className={className}>
      <div className="modal-header">
        <h3>FILTERS</h3>
        <i className="fa fa-times fa-2x close-button" onClick={props.toggle}></i>
      </div>
      {props.children}
    </div>
  )
}

export default FiltersModal;

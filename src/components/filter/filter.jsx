import React from "react";
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

import './filter.scss';

function VisibilityFilterInput(props) {
  return <div className="filter-input">
    <Form.Control
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="What movie are you looking for?"
    /></div>;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({removeCompleted}) => (
  // call functions inside <button element, specific react commands, pass it in at declaration of <Clearbutton  removeCompleted = {this.removeCompleted
  <button onClick={removeCompleted}>
    Clear completed
  </button>
);

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

export default ClearButton;
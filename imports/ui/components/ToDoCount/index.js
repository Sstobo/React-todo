import React from 'react';
import PropTypes from 'prop-types';

const ToDoCount = ({number}) => (
  <div>
    {number} {number > 1 || number === 0 ? 'todos' : 'todo'}
    {/* if numbers greater than one print todos, or if number is equal to 0 print todo */}
  </div>
);

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

export default ToDoCount;
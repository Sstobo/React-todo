import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import "./styles.css";
import ToDoItem from "../../components/ToDoItem";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";

import { ToDos } from "../../../api/todos";

// constructor needs to have its methods inside it
class App extends Component {
  constructor() {
    super();

    this.addToDo = this.addToDo.bind(this);
    this.removeCompleted = this.removeCompleted.bind(this);
  }

  // toggle the checkbox to denote completion status
  toggleComplete(item) {
    ToDos.update(item._id, {$set : {complete: !item.complete}})
  }

  // ToDos is what we call it, the "todos" is what the mongo array calls the collection (db.todos.method(find,delete, ect))

  addToDo(event) {
    event.preventDefault();

    if (this.toDoInput.value) {
      ToDos.insert({
        title: this.toDoInput.value,
        complete: false
      });
      this.toDoInput.value = "";
    }
  }

  // remove a to do from the list
  removeToDo(item) {
    ToDos.remove( {_id: item._id });
  }

  // remove all completed to dos from the list
  removeCompleted() {
    ToDos.find({complete: true }).forEach(todo => 
      ToDos.remove(todo._id)
    ) 
  }

  // check if any of the todos are completed
  hasCompleted() {
    let completed = this.props.todos.filter(todo => todo.complete);
    return completed.length > 0 ? true : false;
  }

  componentDidMount() {
    this.toDoInput.focus();
  }

  render() {
    let number = this.props.todos.length;

    // {this.props.todos  is the current instance of the ref to the DB being passed down}
    return (
      <div className="todo-list">
        <h1>So Much To Do</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={ref => (this.toDoInput = ref)} />
            <span>(press enter to add) </span>
          </form>
        </div>
        <ul>
          {/* this.props.todos.map takes each todo item and iterated out a thing (todoitem in this case) */}
          {this.props.todos.map((todo, index) => (
            <ToDoItem
              key={index}
              item={todo}
              toggleComplete={this.toggleComplete.bind(this, todo)}
              removeToDo={this.removeToDo.bind(this, todo)}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={number} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  todos: []
};

// withtracker lets our program use the mongo db as props with this.props.todos,  or DIRECTLY impact the DB with ToDos ( or whatever you called it)
export default withTracker(() => {
  return {
    todos: ToDos.find({}).fetch()
  };
})(App);

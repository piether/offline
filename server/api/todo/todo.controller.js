'use strict';

var _ = require('lodash');

var todos = {};

// Get list of todos
exports.index = function(req, res) {
  var todosForDate = todos[req.param('date')];
  if(todosForDate) {
    res.json(todosForDate);
  } else {
    res.json([]);
  }
};

var nextId = function(date) {
  console.log(date);
  if(todos[date]) {
    return todos[date].length;
  } else {
    return 0;
  }
};

exports.create = function(req, res) {
  var date = req.param('date');

  var todo = req.body;
  todo.id = nextId(date);

  if(todos[date]) {
    todos[date].push(todo);
  } else {
    todos[date] = [todo];
  }
  res.status(201).json(todo);
};

exports.update = function(req, res) {
  var date = req.param('date');
  var todoId = req.param('todo_id');
  if(!todos[date]) {
    todos[date] = {};
  }
  todos[date][todoId] = req.body;
  res.status(200).end();
};

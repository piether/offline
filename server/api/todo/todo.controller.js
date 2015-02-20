'use strict';

var _ = require('lodash');

var todos = {};

// Get list of todos
exports.index = function(req, res) {
  var userTodos = todos[req.param('user_id')];
  if(userTodos) {
    res.json(userTodos);
  } else {
    res.status(404).send("no user found with id: " + req.param('user_id'));
  }
};

var nextId = function(userId) {
  console.log(userId);
  if(todos[userId]) {
    return todos[userId].length;
  } else {
    return 0;
  }
};

exports.create = function(req, res) {
  var userId = req.param('user_id');

  var todo = req.body;
  todo.id = nextId(userId);

  if(todos[userId]) {
    todos[userId].push(todo);
  } else {
    todos[userId] = [todo];
  }
  res.status(201).json(todo);
};

exports.update = function(req, res) {
  var userId = req.param('user_id');
  var todoId = req.param('todo_id');
  todos[userId][todoId] = req.body;
  res.status(200).end();
};

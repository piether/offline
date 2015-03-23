'use strict';

var express = require('express');
var controller = require('./todo.controller');

var router = express.Router();

router.get('/:date/todos', controller.index);
router.post('/:date/todos', controller.create);
router.put('/:date/todos/:todo_id', controller.update);

module.exports = router;

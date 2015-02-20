'use strict';

var express = require('express');
var controller = require('./todo.controller');

var router = express.Router();

router.get('/:user_id/todos', controller.index);
router.post('/:user_id/todos', controller.create);
router.put('/:user_id/todos/:todo_id', controller.update);

module.exports = router;

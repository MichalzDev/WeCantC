"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config();

var port = process.env.HTTP_PORT || 5000;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express["static"](_path["default"].join(__dirname, 'frontend', 'build')));
var uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/kanbandb?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
});

var tasksRouter = require('./routes/tasks');

var usersRouter = require('./routes/users');

var columnsRouter = require('./routes/columns');

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/columns', columnsRouter);
app.listen(port, function () {
  console.log("Server is running on port: ".concat(port));
});

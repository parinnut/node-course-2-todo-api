var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
    //console.log(req.body);
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res) => {
  var id = req.params.id;
  //Valid id using is valid

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
    //404 - send back emplty send

  Todo.findById(id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  //findById
    //success
      //if todo - send it back
      //if no todo - send back empty body
    //error
      //400 - and send emplty body
});

app.listen(3000, () => {
  console.log('Starting on port 3000');
});

module.exports = {app}

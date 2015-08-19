var express = require("express");
var router = express.Router();
var Task = require("../models/task");
var List = require("../models/list");
var DB = require("../../config/connection");


function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/tasks", function(req, res){
    Task.findAll({order:"id"}).then(function(tasks){
        return res.json(tasks);
    });

});

router.get("/tasks/:id", function(req, res){
  for(var t = 0; t < Task.length; t++){
    if(Task[t].id == req.params.id){
      return res.json(Task[t]);
    }
  }
  return error(res, "not found");
});

router.put("/tasks/:id", function(req, res){
  for(var t = 0; t < Task.length; t++){
    if(Task[t].id == req.params.id){
      Task[t] = req.body;
      return res.json(Task[t]);
    }
  }
  return error(res, "not found");
});

router.delete("/tasks/:id", function(req, res){
  for(var t = 0; t < Task.length; t++){
    if(Task[t].id == req.params.id){
      delete Task[t];
      return res.json({"success": true});
    }
  }
  return error(res, "not found");
});

router.get("/lists/:listId/tasks", function(req, res){
  var tasks = [];
  for(var t = 0; t < Task.length; t++){
    if(Task[t].listId == req.params.listId){
      tasks.push(Task[t]);
    }
  }
  return res.json(tasks);
});

router.post("/lists/:listId/tasks", function(req, res){
  var task;
  for(var l = 0; l < List.length; l++){
    if(List[l].id == req.params.listId){
      task = req.body;
      task.listId = req.params.listId;
      Task.push(task);
      return res.json(task);
    }
  }
  return error(res, "not found");
});

module.exports = router;

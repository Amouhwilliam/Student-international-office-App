import express from "express"
import {create, update, remove, findAll, findOne, removeAll} from "../controllers/event.controller"

const EventRouter = (app: any) => {

    var router = express.Router();
  
    // Create a new Events
    router.post("/", create);
  
    // Retrieve all events
    router.get("/", findAll);
  
    // Retrieve a single Events with id
    router.get("/:id", findOne);
  
    // Update a Events with id
    router.put("/:id", update);
  
    // Delete a Events with id
    router.delete("/:id", remove);
  
    // Create a new Events
    router.delete("/", removeAll);
  
    app.use('/api/events', router);
  };

  export {EventRouter}
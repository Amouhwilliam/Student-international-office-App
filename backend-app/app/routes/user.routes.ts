import express from "express"
import { body, validationResult } from 'express-validator'
import {create, update, remove, findAll, findAllWithoutPagination, findOne, removeAll} from "../controllers/user.controller"

const UsersRouter = (app: any) => {
    var router = express.Router();
  
    // Create a new Events
    router.post("/", body('first_name').isLength({ min: 2 }).isString(),
     body('first_name').isLength({ min: 2 }).isString(),
     body('email').isEmail(),
     body('password').isLength({ min: 5 }), create);
  
    // Retrieve all events
    router.get("/", findAll);

    // Retrieve all events without pagination
    router.get("/all", findAllWithoutPagination);
  
    // Retrieve a single Events with id
    router.get("/:id", findOne);
  
    // Update a Events with id
    router.put("/:id", update);
  
    // Delete a Events with id
    router.delete("/:id", remove);
  
    // Create a new Events
    router.delete("/", removeAll);
  
    app.use('/api/users', router);
  };

  export {UsersRouter}
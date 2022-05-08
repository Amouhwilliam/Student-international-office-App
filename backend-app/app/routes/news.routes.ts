import express from "express"
import {create, update, remove, findAll, findOne, removeAll} from "../controllers/news.controller"

const NewsRouter = (app: any) => {
  
    var router = express.Router();
  
    // Create a new News
    router.post("/", create);
  
    // Retrieve all news
    router.get("/", findAll);
  
    // Retrieve a single News with id
    router.get("/:id", findOne);
  
    // Update a News with id
    router.put("/:id", update);
  
    // Delete a News with id
    router.delete("/:id", remove);
  
    // Create a new News
    router.delete("/", removeAll);
  
    app.use("/api/news", router);
  };

export {NewsRouter}
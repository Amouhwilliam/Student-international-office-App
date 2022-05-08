import {Request, Response} from "express";
import db from "../models";
const Event = db.events;

// Create and Save a new Event
export const create = (req: Request, res: Response) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let {title, subTitle, description, shortDescription, published, media} = req.body

  // Create a Event
  const event = new Event({title, subTitle, description, shortDescription, published, media});

  // Save Event in the database
  event
    .save(event)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Event."
      });
    });
};

// Retrieve all Events from the database with search and filter with published
export const findAll = (req: Request, res: Response) => {
    /*
    * Pagination : { offset: number, limit: number }
    * offset: quantity of items to skip
    * limit: quantity of items to fetch 
    */
    const pagination = {limit: req.query?.limit, offset: req.query?.offset}
  
    const search = req.query?.search;
    
    const published = req.query?.published;
    let condition : any = search ? { title: { $regex: new RegExp(search as string), $options: "i" } } : {};

    condition = published ? { ...condition, published } : condition;

    Event.paginate(condition, pagination)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
      });
};

// Find a single Event with an id
export const findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    Event.findById(id)
      .then((data: any) => {
        if (!data)
          res.status(404).send({ message: "Not found Event with id " + id });
        else res.send(data);
      })
      .catch((err: any) => {
        res
          .status(500)
          .send({ message: "Error retrieving Event with id=" + id });
      });
};

// Update a Event by the id in the request
export const update = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data: any) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Event with id=${id}. Maybe Event was not found!`
            });
          } else res.send({ message: "Event was updated successfully." });
        })
        .catch((err: any) => {
          res.status(500).send({
            message: "Error updating Event with id=" + id,
            error: err 
          });
        });
};

// Delete a Event with the specified id in the request
export const remove = (req: Request, res: Response) => {
    const id = req.params.id;

    Event.findByIdAndRemove(id)
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
          });
        } else {
          res.send({
            message: "Event was deleted successfully!"
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: "Could not delete Event with id=" + id,
          error: err
        });
      });
};

// Delete all Events from the database.
export const removeAll = (req: Request, res: Response) => {
    Event.deleteMany({})
    .then((data: any) => {
      res.send({
        message: `${data.deletedCount} Events were deleted successfully!`
      });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all evens."
      });
    });
};

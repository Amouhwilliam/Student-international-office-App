import {Request, Response} from "express";
import db from "../models";
const News = db.news;

// Create and Save a new News
export const create = (req: Request, res: Response) => {
   // Validate request
   console.log(req.body);
   if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let {title, subTitle, description, shortDescription, published, media} = req.body

  // Create a News
  const news = new News({title, subTitle, description, shortDescription, published, media});

  // Save Event in the database
  news
    .save(news)
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

// Retrieve all news from the database with search and filter with published
export const findAll = (req: Request, res: Response) => {
    /*
    * Pagination : { offset: number, limit: number }
    * offset: quantity of items to skip
    * limit: quantity of items to fetch 
    */
    const pagination = {limit: req.query?.limit, offset: req.query?.offset} 
    const search = req.query?.search;
    const published = req.query?.published;
    let condition: any = search ? { title: { $regex: new RegExp(search as string), $options: "i" } } : {};

    condition = published ? { ...condition, published } : condition;

    News.paginate(condition, pagination)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving news."
        });
      });
};

// Find a single News with an id
export const findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    News.findById(id)
      .then((data: any) => {
        if (!data)
          res.status(404).send({ message: "Not found News with id " + id });
        else res.send(data);
      })
      .catch((err: any) => {
        res
          .status(500)
          .send({ message: "Error retrieving News with id=" + id });
      });
};

// Update a News by the id in the request
export const update = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      News.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data: any) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update News with id=${id}. Maybe News was not found!`
            });
          } else res.send({ message: "News was updated successfully." });
        })
        .catch((err: any) => {
          res.status(500).send({
            message: "Error updating News with id=" + id
          });
        });
};

// Delete a News with the specified id in the request
export const remove = (req: Request, res: Response) => {
    const id = req.params.id;

    News.findByIdAndRemove(id)
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
          });
        } else {
          res.send({
            message: "News was deleted successfully!"
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
};

// Delete all news from the database.
export const removeAll = (req: Request, res: Response) => {
    News.deleteMany({})
    .then((data: any) => {
      res.send({
        message: `${data.deletedCount} News were deleted successfully!`
      });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all news."
      });
    });
};

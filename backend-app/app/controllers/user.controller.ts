import {Request, Response} from "express";
import db from "../models";
import * as bcrypt from "bcrypt"
const User = db.users;

// Create and Save a new User
export const create = async (req: Request, res: Response) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    res.status(400).send({ message: "The email shoud be unique!" });
    return;
  }

  let {first_name, last_name, email, password, address, type, birthdate, profile_picture} = req.body

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = Math.floor(Math.random() * 10000);
  // Create a User
  const user = new User({first_name, last_name, email, password: hashedPassword, address, type, birthdate, matriculation: data, profile_picture});

  // Save User in the database
  user
    .save(user)
    .then((data: any) => {
      const user = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: password,
        address: data.address,
        type: data.type,
        birthdate: data.birthdate,
        matriculation: data.matriculation,
        profile_picture: data.profile_picture,
        _id: data._id,
      }
      res.send({status: 200, user});
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database with search and filter with published
export const findAll = (req: Request, res: Response) => {
    /*
    * Pagination : { offset: number, limit: number }
    * offset: quantity of items to skip
    * limit: quantity of items to fetch 
    */

    const pagination = {limit: req.query?.limit, offset: req.query?.offset} 
    const search = req.query?.search;
    let condition : any = search ? { last_name: { $regex: new RegExp(search as string), $options: "i" } } : {};

    User.paginate(condition, pagination)
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

export const findAllWithoutPagination = (req: Request, res: Response) => {

  User.find()
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
export const findOne = (req: Request, res: Response) => {
    const id = req.params.id;

    User.findById(id)
      .then((data: any) => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch((err: any) => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};

// Update a User by the id in the request
export const update = (req: Request, res: Response) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch((err: any) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
          error: err 
        });
      });
};

// Delete a User with the specified id in the request
export const remove = (req: Request, res: Response) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then((data: any) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
          error: err
        });
      });
};

// Delete all Users from the database.
export const removeAll = (req: Request, res: Response) => {
    User.deleteMany({})
    .then((data: any) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all evens."
      });
    });
};

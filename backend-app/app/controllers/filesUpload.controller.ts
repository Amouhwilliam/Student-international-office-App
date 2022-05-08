import {Request, Response } from "express";
import _ from 'lodash'

export const filesUpload = (req: Request, res: Response) => {
  try {
      console.log(req.files);
      
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let data: any = []; 
          _.forEach(_.keysIn(req.files.files), (key: any) => {
              let requestFiles: any = req?.files?.files 
              let file = requestFiles[key]
              
              file.mv('./uploads/' + file.name);

              data.push({
                  name: file.name,
                  mimetype: file.mimetype,
                  size: file.size,
                  path: '/'+file.name
              });
          });

          res.send({
              status: true,
              message: 'Files are uploaded',
              data: data
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
};

export const fileUpload = (req: Request, res: Response) => {
    try {
        console.log(req.files);
        
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let requestFile: any = req?.files?.file 
                let file = requestFile
                
                file.mv('./uploads/' + file.name);
  
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                    path: '/'+file.name
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
  };
import express from "express"
import {filesUpload, fileUpload} from "../controllers/filesUpload.controller"

const FilesUploadRouter = (app: any) => {
  
    var router = express.Router();
  
    router.post("/upload-files", filesUpload);
    router.post("/upload-file", fileUpload);
  
    app.use('/api', router);
  };

export {FilesUploadRouter}
import express from "express"
import fileUpload from'express-fileupload'
import cors from "cors"
import morgan from 'morgan'
import bodyParser from 'body-parser'
import db from "./app/models";
import {EventRouter} from "./app/routes/event.routes";
import {NewsRouter} from "./app/routes/news.routes";
import {FilesUploadRouter} from "./app/routes/files-upload.routes";
import { UsersRouter } from "./app/routes/user.routes"
import { AuthRouter } from "./app/routes/auth.routes"
import { ChatSystem } from "./app/chat"

const dotenv = require('dotenv');
dotenv.config();

const app = express()

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions))

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 10 * 1024 * 1024 * 1024 // 10MB max file(s) size
  }
}));

app.use(express.static('uploads'));

app.use(morgan('dev'));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

EventRouter(app);
NewsRouter(app);
UsersRouter(app);
AuthRouter(app);
FilesUploadRouter(app);
const server = ChatSystem(app)

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

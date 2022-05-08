import mongoose from "mongoose";
import {dbConfig} from "../../config/db.config";
import { ChatsModel } from "./chat.model";
import {EventsModel} from "./event.model";
import {NewsModel} from "./news.model";
import {UsersModel} from "./user.model";

mongoose.Promise = global.Promise;

const db: any = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.events = EventsModel(mongoose);
db.news = NewsModel(mongoose);
db.users = UsersModel(mongoose);
db.chats = ChatsModel(mongoose);

export default db;
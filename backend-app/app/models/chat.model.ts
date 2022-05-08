import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {userSchema} from "./user.model"

export const messageSchema = new Schema(
    {
      message: {type: String, required: true},
      from: {type: String, required: true}
    },
    { timestamps: true }
  )
  


const ChatsModel = (mongoose: any) => {
  mongoose.plugin(mongoosePaginate)
  const Chat = mongoose.model(
    "chat",
    mongoose.Schema(
      {
        user_starter: {type: userSchema, required: true},
        user_joiner: {type: userSchema, required: true},
        user_starter_id: {type: String, required: true},
        user_joiner_id: {type: String, required: true},
        message: {type: [messageSchema], required: false},
      },
      { timestamps: true }
    )
  );
  return Chat;
};

export {ChatsModel}
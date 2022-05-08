import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
export const userSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: false},
    type: {type: String, required: true},
    birthdate: {type: String, required: true},
    matriculation: {type: String, required: true},
    profile_picture: {type: String, required: false, default: null},
    socket_ids: {type: [], required: false},
  },
  { timestamps: true }
)

const UsersModel = (mongoose: any) => {
  mongoose.plugin(mongoosePaginate)
   const User = mongoose.model(
    "user", userSchema);
  return User;
};

export {UsersModel}
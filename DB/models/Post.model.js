
import { Schema, Types, model } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: Object,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required:true
    },
    like: [
      // array of objects
      {
        type: Types.ObjectId,
        ref: "User",
      }
    ],
    unlike: [
        {
          type: Types.ObjectId,
          ref: "User",
        }
      ],
  },
  {
    timestamps: true,
  }
);

const postModel = model("Post", postSchema);
export default postModel;

import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img_header: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      requiered: true,
    },
    tipo: {
      type: String,
      requiered: true,
      enum: ["reflexiones", "pareja", "religion", "salud mental", "noticia"],
      default: "noticia",
    },
    author: {
      type: String,
      requiered: true,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;

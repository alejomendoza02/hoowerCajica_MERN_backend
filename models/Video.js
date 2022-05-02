import mongoose from "mongoose"; 

const videoSchema = mongoose.Schema(
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
    url: {
        type: String,
        required: true,
        trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;

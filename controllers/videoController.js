import Video from "../models/Video.js";

// Get videos

const getVideos = async (req, res) => {
  // Get the videos in the BD
  const videos = await Video.find();
  res.json(videos);
};

// new videos

const newVideos = async (req, res) => {
  const { url } = req.body;
  const videoExists = await Video.findOne({ url });
  if (videoExists) {
    const error = new Error("Este vídeo ya existe");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const videosNuevos = new Video(req.body);
    //  Save the videos in the DB

    const videos = await videosNuevos.save();
    res.json(videos);
  } catch (error) {
    console.log(error);
  }
};

export { getVideos, newVideos };

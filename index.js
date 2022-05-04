// Import dependencie

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import axios from "axios";
import fetch from "node-fetch";

// Import database config
import conectarDB from "./config/db.js";

//Import routes

import adminRoutes from "./routes/adminRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Config cors

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      // Permiss to consult the API
      callback(null, true);
    } else {
      console.log(origin);
      // Doesn't have permiss
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing

app.use("/api/admin", adminRoutes);
app.use("/api/post", postRoutes);
app.use("/api/video", videoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

cron.schedule("*/10 7-9 * * *", () => {
  const getVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?channelId=UCLWdgr_6AJogMp4EmirXnQw&part=snippet,id&order=date&maxResults=1&key=${process.env.YOUTUBE_API}`
      );

      const data = await response.json();

      await axios.post(
        `${process.env.BACKEND_URL}/api/video`,
        {
          title: data.items[0].snippet.title,
          img_header: data.items[0].snippet.thumbnails.high.url,
          url: data.items[0].id.videoId,
        },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.log(error);
    }
  };
  getVideos();
}, {
  scheduled: true,
  timezone: "America/Bogota"
});

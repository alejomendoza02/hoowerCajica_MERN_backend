import express from "express"; 

import { getVideos, newVideos } from "../controllers/videoController.js";

const router = express.Router();

router.route("/").get(getVideos).post(newVideos);

export default router;

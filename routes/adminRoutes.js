import express from "express";

import {
  register,
  authenticate,
  profile,
} from "../controllers/adminController.js";
import checkAuthAdmin from "../middleware/checkAuthAdmin.js";

const router = express.Router();

router.post("/", register); // Create a new user
router.post("/login", authenticate); // Check if the username and the pasword
router.get("/profile", checkAuthAdmin, profile); // Check if the user has been authenticated

export default router;

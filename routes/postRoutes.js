import express from "express";

import {
  getPostsAdmin,
  newPostAdmin,
  getPostAdmin,
  editPostAdmin,
  deletePostAdmin,
  getPosts,
  getPost
} from "../controllers/postController.js";

import checkAuthAdmin from "../middleware/checkAuthAdmin.js";

const router = express.Router();

// Private Zone

router
  .route("/private")
  .get(checkAuthAdmin, getPostsAdmin)
  .post(checkAuthAdmin, newPostAdmin);

router
  .route("/private/:id")
  .get(checkAuthAdmin, getPostAdmin)
  .put(checkAuthAdmin, editPostAdmin)
  .delete(checkAuthAdmin, deletePostAdmin);

// Public Zone

router.get("/public", getPosts);
router.get("/public/:id", getPost);

export default router;

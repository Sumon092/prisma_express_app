import { postController } from "./post.controller";

const express = require("express");
const router = express.Router();

router.post("/add-post", postController.addPost);
router.get("/all-post", postController.getAllPost);

export const postRoutes = router;

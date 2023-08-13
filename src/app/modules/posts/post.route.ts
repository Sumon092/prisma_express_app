import { postController } from "./post.controller";

const express = require("express");
const router = express.Router();

router.post("/add-post", postController.addPost);

export const postRoutes = router;

import { Request, Response } from "express";
import { postService } from "./post.services";

const addPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.addPost(req.body);
    res.send({
      success: true,
      message: "post added successfully",
      post,
    });
  } catch (error) {
    res.send(error);
  }
};
const getAllPost = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPost();
    res.send({
      success: true,
      message: "posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.send(error);
  }
};
export const postController = {
  addPost,
  getAllPost,
};

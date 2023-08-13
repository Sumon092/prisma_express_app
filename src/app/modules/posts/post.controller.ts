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
  const options = req.query;
  try {
    const posts = await postService.getAllPost(options);
    res.send({
      success: true,
      message: "posts retrieved successfully",
      posts,
    });
  } catch (error) {
    res.send(error);
  }
};
const getPost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await postService.getPost(id);
    res.send({
      success: true,
      message: "post retrieved successfully",
      post,
    });
  } catch (error) {
    res.send(error);
  }
};
export const postController = {
  addPost,
  getAllPost,
  getPost,
};

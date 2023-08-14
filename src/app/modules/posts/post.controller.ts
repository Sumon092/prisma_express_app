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
  console.log(options);
  try {
    const posts = await postService.getAllPost(options);
    console.log({ posts });
    res.send({
      success: true,
      message: "posts retrieved successfully",
      total: posts.data,
      data: posts.post,
    });
  } catch (error) {
    console.log(error);
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
const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const payload = req.body;
    const post = await postService.updatePost(id, payload);
    res.send({
      success: true,
      message: "post updated successfully",
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
  updatePost,
};

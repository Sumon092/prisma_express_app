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
    console.log({ posts });
    res.send({
      success: true,
      message: "posts retrieved successfully",
      total: posts.data,
      data: posts.post,
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
const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const post = await postService.deletePost(id);
    res.send({
      success: true,
      message: "post deleted successfully",
      post,
    });
  } catch (error) {
    res.send(error);
  }
};
const learnAggregateAndGroupingController = async (
  req: Request,
  res: Response
) => {
  console.log("aggregate route heated");
  try {
    const result = await postService.learnAggregateAndGroupingService();
    res.send({
      success: true,
      message: "aggregation result",
      result,
    });
  } catch (error: any) {
    console.log(error.message, "what is error here");
    res.send(error.message);
  }
};

export const postController = {
  addPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  learnAggregateAndGroupingController,
};

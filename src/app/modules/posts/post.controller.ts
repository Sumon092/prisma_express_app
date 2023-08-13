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
export const postController = {
  addPost,
};

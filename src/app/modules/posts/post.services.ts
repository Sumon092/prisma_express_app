import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addPost = async (data: Post): Promise<Post> => {
  const post = await prisma.post.create({
    data,
  });
  return post;
};

export const postService = {
  addPost,
};

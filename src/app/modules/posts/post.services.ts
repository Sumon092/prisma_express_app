import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addPost = async (data: Post): Promise<Post> => {
  const post = await prisma.post.create({
    data,
    include: {
      author: true,
      categories: true,
    },
  });
  return post;
};

const getAllPost = async () => {
  const post = await prisma.post.findMany({
    include: {
      author: true,
      categories: true,
    },
  });
  return post;
};

export const postService = {
  addPost,
  getAllPost,
};

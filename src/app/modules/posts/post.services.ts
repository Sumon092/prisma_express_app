import { Post, PrismaClient } from "@prisma/client";
import { serialize } from "v8";

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

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm } = options;
  const post = await prisma.post.findMany({
    include: {
      author: true,
      categories: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  return post;
};
const getPost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
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
  getPost,
};

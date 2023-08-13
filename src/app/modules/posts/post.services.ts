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
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);
  const post = await prisma.post.findMany({
    skip,
    take,
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

/**
 * limit=5,
 * page=1,
 * total=10,
 * take=limit,
 * skip=limit*page-limit
 *     =5*1-5=0 when page1
 *     =5*2-5=5 when page2
 *     =5*3-5=10 when page3
 */

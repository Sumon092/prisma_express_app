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

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;
  return await prisma.$transaction(async (tx) => {
    const post = await tx.post.findMany({
      skip,
      take,
      include: {
        author: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
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
          {
            author: {
              role: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();
    return { data: total, post };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const learnAggregateAndGroupingService = async () => {
  const result = await prisma.post.aggregate({
    _avg: {
      categoryId: true,
      authorId: true,
    },
    _count: {
      categoryId: true,
    },
    _sum: {
      categoryId: true,
    },
  });
  if (result) {
    return result;
  } else {
    throw new Error("aggregation declined");
  }
};

export const postService = {
  addPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  learnAggregateAndGroupingService,
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

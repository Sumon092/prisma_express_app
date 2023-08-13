import { PrismaClient, Profile, User } from "@prisma/client";
import { profile } from "console";
const prisma = new PrismaClient();
const insertIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const addOrUpdate = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });
  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }
  const result = await prisma.profile.create({
    data,
  });
  return result;
};
const getUsers = async () => {
  const users = await prisma.user.findMany({
    //! to show email only
    // select: {
    //   email: true,
    //   name: true,
    // },
    //! to show profile data (another table)
    // include: {
    //   profile: true,
    // },
  });
  return users;
};
const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
  return user;
};

export const userService = {
  insertIntoDb,
  addOrUpdate,
  getUsers,
  getUser,
};

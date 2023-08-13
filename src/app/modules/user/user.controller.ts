import { Request, Response } from "express";
import { userService } from "./user.services";

const insertIntoDb = async (req: Request, res: Response) => {
  try {
    const result = await userService.insertIntoDb(req.body);
    res.json({
      success: true,
      message: "User added successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdate = async (req: Request, res: Response) => {
  try {
    const profile = await userService.addOrUpdate(req.body);
    res.json({
      success: true,
      message: "User added successfully",
      data: profile,
    });
  } catch (error) {
    res.send(error);
  }
};
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({
      success: true,
      message: "Users retrieve successfully",
      data: users,
    });
  } catch (error) {
    res.send(error);
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUser(id);
    res.json({
      success: true,
      message: "Users retrieve successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
export const userController = {
  insertIntoDb,
  insertOrUpdate,
  getUsers,
  getUser,
};

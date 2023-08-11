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
export const userController = {
  insertIntoDb,
};

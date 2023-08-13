import { Request, Response } from "express";
import { categoryService } from "./category.services";

const insertCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.insertCategory(req.body);
    res.send({
      success: true,
      message: "category successfully added",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const categoryController = {
  insertCategory,
};

import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/add-user", userController.insertIntoDb);

export const userRoutes = router;

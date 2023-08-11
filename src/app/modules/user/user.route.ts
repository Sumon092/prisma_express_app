import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/add-user", userController.insertIntoDb);
router.post("/profile", userController.insertOrUpdate);

export const userRoutes = router;

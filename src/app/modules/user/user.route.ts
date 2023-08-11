import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/add-user", userController.insertIntoDb);
router.post("/profile", userController.insertOrUpdate);
router.get("/all-user", userController.getUsers);

export const userRoutes = router;

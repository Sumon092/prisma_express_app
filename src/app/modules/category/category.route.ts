import { categoryController } from "./category.controller";

const express = require("express");
const router = express.Router();

router.post("/add-category", categoryController.insertCategory);

export const categoryRoutes = router;

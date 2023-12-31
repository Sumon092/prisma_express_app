import express, { Application } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { categoryRoutes } from "./app/modules/category/category.route";
import { postRoutes } from "./app/modules/posts/post.route";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;

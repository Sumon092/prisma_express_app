import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import cors from "cors";
const port = process.env.PORT || 5000;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();
async function main() {
  app.listen(port, () => {
    console.log(`prisma app running on ${port}`);
  });
}
main();

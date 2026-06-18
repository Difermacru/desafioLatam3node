import cors from "cors";
import "dotenv/config";
import express from "express";
import postRoute from "./route/post.route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/posts", postRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
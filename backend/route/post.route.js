import { postController } from "../controllers/post.controller.js";
import { postModel } from "../models/post.models.js";
import { Router } from "express";

const router = Router();

//GET /POSTS
router.get("/", postController.read);

// POST /posts
router.post("/", postController.create);

//PUT /posts/:id
router.put("/:id", postController.update)

// PUT /posts/like/:id
router.put("/like/:id", postController.updateLike);

//DELETE/posts/:id
router.delete("/:id", postController.remove);

export default router
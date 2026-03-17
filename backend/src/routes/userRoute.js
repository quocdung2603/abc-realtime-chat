import express from "express";
import {
  authMe,
  searchUserByUsername,
  uploadAvatar,
} from "../controllers/userController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/me", authMe);

router.get("/search", searchUserByUsername);

router.post("/upload-avatar", upload.single("file"), uploadAvatar);

export default router;

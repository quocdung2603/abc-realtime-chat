import express from "express";
import {
  createConversation,
  getConversations,
  getMessages,
} from "../controllers/conversationController.js";
import { CheckFriendship } from "../middlewares/friendMiddleware.js";

const router = express.Router();

router.post("/", CheckFriendship, createConversation);
router.get("/", getConversations);
router.get("/:conversationId/messages", getMessages);

export default router;

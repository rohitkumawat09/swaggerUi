import express from "express";
const router = express.Router();
import { profile } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile (protected)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome profile message
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticateToken, profile);

export default router;

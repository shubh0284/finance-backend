import express from "express";
import { register, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { getAllUsers, updateUserStatus } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//protected route(only admin)
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

//analyst and admin
router.get(
  "/analytics",
  authMiddleware,
  authorizeRoles("admin", "analyst"),
  (req, res) => {
    res.json({ message: "Analytics data" });
  },
);

//all logged-in user
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "User profile" });
});

//adminzOnly
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers
);

//update user status(admin only)
router.patch(
  "/users/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  updateUserStatus
);

export default router;

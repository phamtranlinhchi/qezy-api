import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import userController from "../controllers/user.controller";

export const userRouter: Router = express.Router();

// /api/user/
userRouter.get("/", auth, userController.getUser);
userRouter.post("/login", auth, userController.login);
userRouter.get("/role", auth, userController.getRole);
userRouter.get("/users", auth, userController.getUsersByRole);

import { Router } from "express";
import { signup, login, logout, refresh, getCurrentUser } from "../controller/AuthController.js";
import { validateSignup, validateLogin } from "../middleware/validationMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const AuthRouter = new Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { error: "Too many login attempts, please try again later." },
});

AuthRouter.post("/signup", loginLimiter, validateSignup, signup);
AuthRouter.post("/login", loginLimiter, validateLogin, login);
AuthRouter.post("/logout", logout);
AuthRouter.post("/refresh", refresh);
AuthRouter.get("/me", verifyToken, getCurrentUser);

export default AuthRouter;

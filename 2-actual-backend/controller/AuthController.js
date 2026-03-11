import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "super_secret_access_key_123456";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "super_secret_refresh_key_123456";

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign({ userId, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId, role }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      passwordHash,
      role,
    });

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshToken: token });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(
        user._id,
        user.role
      );

      user.refreshToken = newRefreshToken;
      user.save();

      setCookies(res, newAccessToken, newRefreshToken);

      res.status(200).json({ message: "Token refreshed successfully" });
    });
  } catch (error) {
    console.error("Refresh Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash -refreshToken");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get Current User Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

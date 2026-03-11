import jwt from "jsonwebtoken";

// Ideally these should be in a .env file, mapping here for simplicity in this project structure
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "super_secret_access_key_123456";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // { userId, role }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access Denied: Invalid or expired token" });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Sellers only" });
  }
};

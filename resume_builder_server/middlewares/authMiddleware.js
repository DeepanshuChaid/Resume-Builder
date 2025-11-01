import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  // Accept token as "Bearer <token>" or raw token
  let token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;


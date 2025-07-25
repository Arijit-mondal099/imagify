import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ success: flase, message: error.message });
  }
};

export default auth;

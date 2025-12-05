import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token tidak ditemukan" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    req.user = decoded;
    next();
  });
}

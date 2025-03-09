import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  // if (token.startsWith("Bearer ")) {
  //   token = token.split(" ")[1];
  //   console.log("Token bearer", token);
  // }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Not authorized, token failed" });
  }
};
export const admin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

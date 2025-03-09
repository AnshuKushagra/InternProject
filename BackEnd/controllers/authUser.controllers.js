import bcrypt from "bcryptjs";
import User from "../models/adminUser.model.js";
import { generateToken } from "../lib/utils.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ messsage: "Invalid Credentials" });
    }
    const token = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Error in the login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All the fields are required " });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error is signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token, userId: user._id, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const adminUser = await User.findById(req.user.id);
//     if (!adminUser) return res.status(403).json({ message: "Not authorized" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(201).json({ token, userId: newUser._id, name: newUser.name });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const logout = async (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged Out Successfully" });
//   } catch (error) {
//     console.log("Error in the logout controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

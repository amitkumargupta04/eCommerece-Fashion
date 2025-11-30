import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/genrateToken.js";

export const signupUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      fullname,
      email,
      password: hashPassword,
      role: role || "user"
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: createdUser,
    });
  } catch (error) {
    console.log("Error in signup user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const passwordCompare = await bcrypt.compare(password, existUser.password);
    if (!passwordCompare) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    // const token = jwt.sign(
    //   { id: existUser._id, role: existUser.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );
    const token = generateToken(existUser);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: existUser,
    });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Backend me kuch store nahi hai, bas success message
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.log("Error in logout", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};



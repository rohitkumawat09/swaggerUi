import data from "../models/register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateToken(dataId) {
  return jwt.sign({ id: dataId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
export async function register(req, res) {
  console.log("first");
  try {
    const { name, email, password } = req.body;

    const existingdata = await data.findOne({ email });

    if (existingdata) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newdata = new data({
      name,
      email,
      password: hashedPassword,
    });

    await newdata.save();

    res.status(201).json({ message: "data successfully registered" });
  } catch (err) {
    console.error("Register Error:", err.message);
  }
}

export async function login(req, res) {
  console.log("login");
  try {
    const { email, password } = req.body;

    const user = await data.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = generateToken(user._id);

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err.message);
    next(err);
  }
}

export async function profile(req, res) {
  console.log("profile");
  try {
    const user = `Welcome! This is your protected profile.`;

    res.json({
      message: user,
    });
  } catch (err) {
    console.error("profile Error:", err.message);
  }
}

const Student = require("../Models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const audit = require("../Models/audit");
const { request, response } = require("express");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const stdu = await Student.create(req.body);
    res.json(stdu);
  } catch (error) {
    throw new Error(error);
  }
};

function generateToken(student) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const payload = {
    studentId: student._id,
    email: student.email,
    password: student.password,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required.");
    }
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res
        .status(401)
        .json({ message: "Student with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    const token = generateToken(newStudent);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res
      .status(201)
      .json({ message: "Student registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(402).json({ message: "Invalid email or password." });
    }

    const token = generateToken(student);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// const getAllstd = async (req, res, next) => {
//   const students = await Student.find();
//   res.json(students);
// };

module.exports = {
  register,
  login,
  signup,
  // getAllstd
};

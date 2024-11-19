const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

// Encryption key and algorithm (keep this key secure)
const ENCRYPTION_KEY = crypto.randomBytes(32); // Use secure storage like environment variables
const IV_LENGTH = 16;

// Fixed admin credentials
const FIXED_ADMIN_EMAIL = "admin@example.com";
const FIXED_ADMIN_PASSWORD = encrypt("admin"); // Encrypt the fixed password

// Helper function to encrypt data
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Helper function to decrypt data
function decrypt(text) {
  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for fixed admin credentials
    if (email === FIXED_ADMIN_EMAIL && password === decrypt(FIXED_ADMIN_PASSWORD)) {
      return res.status(200).json({
        message: `Welcome Back Admin`,
        success: true,
        isAdmin: true,
      });
    }

    // Check for dynamic admin credentials
    const findAdmin = await Admin.findOne({ email });
    if (!findAdmin) {
      return res.status(404).json({
        message: "Admin not found",
        success: false,
      });
    }

    // Validate password
    const isPasswordMatch = await bcrypt.compare(password, findAdmin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Wrong password",
        success: false,
      });
    }

    // Generate a token for the dynamic admin
    const token = jwt.sign({ adminId: findAdmin._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .json({
        message: `Welcome Back ${findAdmin.fullname}`,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
      success: false,
    });
  }
};

const adminPage = async (req, res) => {
  try {
    res.status(200).json({
      message: "Admin Page Accessed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to access admin page",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  adminPage,
};

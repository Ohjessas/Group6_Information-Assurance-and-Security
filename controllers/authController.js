const pool = require("../db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Helper to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email
async function sendOTPEmail(email, code) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MySecureApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your One-Time Password (OTP)",
    text: `Your OTP code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
}

// POST /api/auth/login
exports.loginUser = async (req, res) => {
  console.log("📥 POST /login hit");
  console.log("Request body:", req.body);

  const { email } = req.body;

  if (!email) {
    console.warn("⚠️ Email missing from request.");
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      console.warn("❌ Email not registered:", email);
      return res.status(404).json({ message: "Email not registered." });
    }

    const otp = generateOTP();
    console.log("🔐 Generated OTP:", otp);

    await pool.query(
      "INSERT INTO otps (email, code, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP)",
      [email, otp]
    );

    await sendOTPEmail(email, otp);

    console.log("✅ OTP sent to:", email);
    return res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

// POST /api/auth/verify-otp
exports.verifyOTP = async (req, res) => {
  console.log("🔎 Verifying OTP for:", req.body);

  const { email, code } = req.body;

  if (!email || !code) {
    return res
      .status(400)
      .json({ message: "Email and OTP code are required." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM otps WHERE email = $1 AND code = $2 ORDER BY created_at DESC LIMIT 1",
      [email, code]
    );

    if (result.rows.length === 0) {
      console.warn("❌ Invalid or expired OTP for:", email);
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const otpRecord = result.rows[0];
    const timeElapsed =
      (new Date() - new Date(otpRecord.created_at)) / 1000 / 60;

    if (timeElapsed > 5) {
      console.warn("⏰ OTP expired for:", email);
      return res.status(400).json({ message: "OTP expired." });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`✅ OTP verified. Token issued for: ${email}`);
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ OTP verify error:", err);
    return res
      .status(500)
      .json({ message: "Server error during OTP verification." });
  }
};

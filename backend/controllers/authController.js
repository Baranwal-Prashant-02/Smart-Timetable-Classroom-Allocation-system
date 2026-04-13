const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const SECRET = "mysecretkey"   // later move to .env

// 🔥 REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    if (
      !email.endsWith("@admin.com") &&
      !email.endsWith("@edu.in") &&
      !email.endsWith("@gmail.com")
    ) {
      return res.status(400).json({ error: "Only authorized domains allowed" })
    }

    let role = ""

    if (email.endsWith("@admin.com")) role = "admin"
    else if (email.endsWith("@edu.in")) role = "faculty"
    else if (email.endsWith("@gmail.com")) role = "student"
    else return res.status(400).json({ error: "Invalid email domain" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword,
      role
    })

    await user.save()

    res.json({ message: "User registered successfully" })

  } catch (err) {
    res.status(400).json({ error: "User already exists" })
  }
}

// 🔥 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    message: "Login successful",
    token,
    role: user.role
  })
}
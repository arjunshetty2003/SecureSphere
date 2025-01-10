const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5001;
const SECRET_KEY = "your-secret-key"; // Replace with a secure key

app.use(cors());
app.use(express.json());

// Sample users (for testing only)
const users = [
  { username: "admin", password: "password" },
  { username: "user", password: "1234" },
];

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Protected route for security logs
app.get("/api/security-logs", authenticateToken, (req, res) => {
  res.json({
    logs: [
      { id: 1, message: "Login successful", timestamp: "2025-01-09 17:00:00" },
      { id: 2, message: "Password change", timestamp: "2025-01-08 12:30:00" },
      { id: 3, message: "Login failed", timestamp: "2025-01-07 20:45:00" },
    ],
  });
});

// Default route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
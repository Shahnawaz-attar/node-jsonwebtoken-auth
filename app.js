const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/auth");
const isAuthenticated = require("./middleware/isAuthenticated");

require("./db");
app.use("/", authRoutes);

// Protected route example
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send("Welcome to the dashboard");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

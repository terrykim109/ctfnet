// server.js
const express = require("express");
const path = require("path");
const app = express();

const FLAG = "fundservCTF{hidden_ninja_headers}";

// Middleware to add the header to main routes
// app.use((req, res, next) => {
//   // Only send flag header on specific routes, not assets
//   if (req.path === "/" || req.path === "/matrix") {
//     res.setHeader("X-CTF-Flag", FLAG);
//   }
//   next();
// });
app.use((req, res, next) => {
  if (req.path === "/" || req.path.startsWith("/matrix") ) {
    res.setHeader("X-CTF-Flag", FLAG);
  }
  next();
});

// Serve static files (HTML, JS, CSS) from public folder
app.use(express.static(path.join(__dirname, "public")));

// Root route: serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint for curiosity
app.get("/matrix", (req, res) => {
  res.json({ message: "You hit the matrix! Check the response headers 👀" });
});

// Optional: route that does not send flag
app.get("/no-header", (req, res) => {
  res.send("<p>No secret here. Try inspecting the root page instead!</p>");
});

// Launch server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

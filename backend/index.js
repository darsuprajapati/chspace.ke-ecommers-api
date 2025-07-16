const express = require("express");
const route = require("./routes/main.route");
const connectDB = require("./db/db.js");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const YAML = require("yamljs");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// API routes
app.use("/api", route);

// Serve Swagger static files
app.use("/swagger", express.static(path.join(__dirname, "public/swagger")));

// Load OpenAPI YAML
const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"));

// Serve Swagger JSON
app.get("/swagger/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

// Serve Swagger UI HTML
app.get("/api-docs", (req, res) => {
  const swaggerHTML = fs.readFileSync(
    path.join(__dirname, "swagger-template.html"),
    "utf8"
  );
  const renderedHTML = swaggerHTML.replace(
    "SWAGGER_JSON_URL",
    "/swagger/swagger.json"
  );
  res.send(renderedHTML);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/api-docs`);
});

// ✅ Export app for Vercel
// module.exports = app;

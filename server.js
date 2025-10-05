import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Import routes
import userRoutes from "./routes/users.js";
import auth from './routes/auth.js'
import leagueRoutes from './routes/league.js'


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount API routes

app.use("/api", userRoutes);
app.use("/api/auth", auth)
app.use("/api", leagueRoutes)


// Protected route example


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;

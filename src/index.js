import express from "express";
import allRouter from "#router/index.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

// activate all routes
app.use("/", allRouter);

app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
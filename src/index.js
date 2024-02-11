import express from "express";
import allRouter from "#router/index.js";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(bodyParser.json());

app.use(cors(corsOptions)) // Use this after the variable declaration

// activate all routes
app.use("/", allRouter);


app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
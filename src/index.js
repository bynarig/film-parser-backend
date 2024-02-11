import express from "express";
import allRouter from "#router/index.js";
import {DB, connect} from "#utils/connectMongoose.js";
import redis from '#middlewares/redisMiddleware.js'
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
const { models } = DB; // extracting al models

const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use((req, res, next) => {
  // now in every request would be our models, we don't need to import everywhere
  req.models = models;
  next();
});
connect();


const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(redis())
app.use(bodyParser.json());

app.use(cors(corsOptions)) // Use this after the variable declaration

// activate all routes
app.use("/", allRouter);


app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
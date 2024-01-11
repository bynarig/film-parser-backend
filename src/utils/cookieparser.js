/*
*
*     IT`S A TEMPLATE, IN FUTURE NEEDS TO BE VALID COOKIE PARSER
*
* */

import express from "express";

import cookieParser from "cookie-parser";

//todo: Valid cookie validator

const app = express();

async function validateCookies (req, res, next) {
	await cookieValidator(req.cookies);
	next();
}

app.use(cookieParser());

app.use(validateCookies);

// error handler
app.use((err, req, res, next) => {
	res.status(400).send(err.message);
});
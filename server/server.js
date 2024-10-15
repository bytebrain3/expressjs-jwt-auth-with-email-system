import jwt from "jsonwebtoken";
import express from "express";
import cors from 'cors';

import cookieParser from "cookie-parser";


import { User } from '../model/user.js';

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../db/connectDatabase.js";
import authRouters from "../router/auth.router.js";
import { genaretTokenAndSetCookies } from "../utils/genaretTokenAndSetCookies.js";




const app = express();
const PORT = process.env.PORT || 8785;


const allowedOrigins = [
	'https://www.dipxplore.com',
	
];

app.use(cors({
	origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, origin);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
}));


//app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  const message = {
		status: "I am still alive, but why? It's almost 2025.",
		goal: "My goal is to end this life on 29th Feb 2028. That was the day we promised to marry each other and start a new life, but it's not going to happen anymore. But, I'm a man of my word, so I'll fulfill the promise by ending this life. pray for me that's i can make my family happy and also make my dream come true . i love her but she doesn't .life is too short enjoy"
	}

	res.json(message)
});

app.use("/api/v1/auth", authRouters);

app.listen(8000, () => {
  connectDB();
  console.log("[info] app is running on", PORT);
});

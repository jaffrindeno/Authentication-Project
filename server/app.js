import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRoute.js";
import { mongodb_connect } from "./lib/db.js";


const app = express();



dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.use(express.json());

app.use("/api/user", userRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
    });
};

app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV == "production"? "Internal Server Error" : err.message});
});

app.listen(PORT || 5000, () => {
    console.log(`Listening to port ${PORT}`);
    mongodb_connect();
});
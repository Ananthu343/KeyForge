import http from "http"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Database from "./models/db.js"

dotenv.config()
const clientPath = process.env.CLIENT_BASE_PATH;
const connectionString = process.env.CONNECTION_STRING;

const corsOptions = {
    origin: [clientPath, "http://localhost:5173/"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

const db = new Database(connectionString);
db.connect();  
  
const app = express()
app.use(cors(corsOptions));


const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
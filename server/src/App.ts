import express from "express";
import path from 'path';
import cors from "cors";
import http from 'http';
import cookieParser from 'cookie-parser';

import "./db/ConnectDB";
import { config } from "./Config";
import { routesInit } from './Router';

const app = express();
app.use(cors({
  origin:true,
  credentials:true
}));

app.use(express.json());

app.use(cors());


app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")))

const port = config.port

routesInit(app);

const server = http.createServer(app);

server.listen(port);


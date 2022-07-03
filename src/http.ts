import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { handleData } from './utils';

dotenv.config();

const app = express();

app.use(cors());

const httpServer = http.createServer(app);

export { httpServer };

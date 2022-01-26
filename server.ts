import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import {clientRouter} from "./routes/client.routes";
import cors from 'cors'

const app = express();
app.use(cors())
dotenv.config({ path: './.env' });

app.use(bodyParser.json());
app.use("/api", clientRouter);
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });

app.listen(process.env.PORT, () => {
    console.log(`Node server started running on ${process.env.PORT}`);
});
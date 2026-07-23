import express from "express";
import { busRouter } from "./router/microbus.routes.ts";

const app = express();

app.use(express.json())
app.use("/fleet", busRouter);
const PORT = 3000;

app.listen(PORT, () => {});
console.log(`Listening on port ${PORT}`);

import express from "express";
import authRouter from "./router/authRoutes.ts";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

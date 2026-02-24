import express from "express";
import cors from "cors";
import calcRouter from "./routes/calc.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use("/calc", calcRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
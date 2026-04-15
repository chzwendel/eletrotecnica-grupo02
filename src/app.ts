import express from "express";

export const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidorr rodando em http://localhost:3000");
});
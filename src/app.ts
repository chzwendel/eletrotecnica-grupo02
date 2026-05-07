import express from "express";
import { AmbienteRepository } from "./repositories/AmbienteRepository";

export const app = express();

Con()
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidorr rodando em http://localhost:3000");
});
import { app } from "../app";
import { SensorRepository } from "../repositories/SensorRepository";
import { Sensor } from "../models/Sensor";

export function SensorController() {
  const repository = new SensorRepository();

  // Criar um novo sensor
  app.post("/sensores", (req, res) => {
    try {
      const { nome, tipo, status, valor } = req.body;
      const novoSensor: Sensor = { nome, tipo, status, valor };
      const sensorSalvo = repository.salvar(novoSensor);
      return res.status(201).json(sensorSalvo);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao salvar sensor" });
    }
  });

  // Listar todos ou filtrar por tipo via query (?tipo=X)
  app.get("/sensores", (req, res) => {
    const { tipo } = req.query;
    if (tipo) {
      return res.json(repository.buscarPorTipo(tipo as string));
    }
    return res.json(repository.listarTodos());
  });

  // Buscar um sensor específico pelo ID
  app.get("/sensores/:id", (req, res) => {
    const id = Number(req.params.id);
    const sensor = repository.buscarPorId(id);
    return sensor ? res.json(sensor) : res.status(404).json({ erro: "Não encontrado" });
  });

  // Atualizar o status de um sensor específico
  app.put("/sensores/:id/status", (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const atualizado = repository.atualizarStatus(id, status);
    return atualizado ? res.json({ mensagem: "Atualizado" }) : res.status(404).json({ erro: "Erro ao atualizar" });
  });

  // Excluir um sensor pelo ID
  app.delete("/sensores/:id", (req, res) => {
    const id = Number(req.params.id);
    const excluido = repository.excluir(id);
    return excluido ? res.status(204).send() : res.status(404).json({ erro: "Não encontrado" });
  });
}
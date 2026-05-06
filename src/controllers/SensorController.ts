import { Request, Response } from "express";
import { SensorRepository } from "../repositories/SensorRepository";
import { Sensor } from "../models/Sensor";

const repo = new SensorRepository();

export class SensorController {
  
  criar(req: Request, res: Response) {
    try {
      const { nome, tipo, status, valor } = req.body;
      const novoSensor: Sensor = { nome, tipo, status, valor };
      const sensorSalvo = repo.salvar(novoSensor);
      return res.status(201).json(sensorSalvo);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao salvar sensor" });
    }
  }

  listar(req: Request, res: Response) {
    const { tipo } = req.query;
    if (tipo) {
      return res.json(repo.buscarPorTipo(tipo as string));
    }
    return res.json(repo.listarTodos());
  }

  buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const sensor = repo.buscarPorId(id);
    return sensor ? res.json(sensor) : res.status(404).json({ erro: "Não encontrado" });
  }

  atualizarStatus(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status } = req.body;
    const atualizado = repo.atualizarStatus(id, status);
    return atualizado ? res.json({ mensagem: "Atualizado" }) : res.status(404).json({ erro: "Erro ao atualizar" });
  }

  excluir(req: Request, res: Response) {
    const id = Number(req.params.id);
    const excluido = repo.excluir(id);
    return excluido ? res.status(204).send() : res.status(404).json({ erro: "Não encontrado" });
  }
}
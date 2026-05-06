import { Request, Response } from "express";
import { HistoricoRepository } from "../repositories/HistoricoRepository";

const repo = new HistoricoRepository();

export class HistoricoController {

  criar(req: Request, res: Response) {
    try {
      const salvo = repo.salvar(req.body);
      return res.status(201).json(salvo);
    } catch (error) {
      return res.status(400).json({ erro: "Erro ao salvar registro" });
    }
  }

  listar(req: Request, res: Response) {
    const { sensor_id } = req.query;
    
    const dados = sensor_id 
      ? repo.buscarPorSensor(Number(sensor_id)) 
      : repo.listarTodos();

    return res.json(dados);
  }

  buscarPorId(req: Request, res: Response) {
    const registro = repo.buscarPorId(Number(req.params.id));
    return registro 
      ? res.json(registro) 
      : res.status(404).json({ erro: "Registro não encontrado" });
  }

  excluir(req: Request, res: Response) {
    const sucesso = repo.excluir(Number(req.params.id));
    return sucesso 
      ? res.status(204).send() 
      : res.status(404).json({ erro: "Registro não encontrado" });
  }

  limparAntigos(req: Request, res: Response) {
    const { dataLimite } = req.body;
    const total = repo.limparHistoricoAntigo(dataLimite);
    return res.json({ removidos: total });
  }
}
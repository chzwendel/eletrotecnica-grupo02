import { Request, Response } from "express";
import { AmbienteRepository } from "../repositories/AmbienteRepository";

const repo = new AmbienteRepository();

export class AmbienteController {

  salvar(req: Request, res: Response) {
    try {
      const novoAmbiente = repo.salvar(req.body);
      return res.status(201).json(novoAmbiente);
    } catch (error) {
      return res.status(400).json({ erro: "Erro ao salvar estado do ambiente" });
    }
  }

  buscarAtual(req: Request, res: Response) {
    const atual = repo.buscarAtual();
    return atual ? res.json(atual) : res.status(404).json({ erro: "Nenhum estado registrado" });
  }

  listarHistorico(req: Request, res: Response) {
    return res.json(repo.listarHistoricoEstados());
  }

  atualizarEstado(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;
    const sucesso = repo.atualizarEstado(Number(id), estado);
    return sucesso ? res.json({ mensagem: "Estado atualizado" }) : res.status(404).json({ erro: "Não encontrado" });
  }

  atualizarAtuadores(req: Request, res: Response) {
    const { id } = req.params;
    const { ventilacao, valvula_gas, tomadas } = req.body;
    const sucesso = repo.atualizarAtuadores(Number(id), ventilacao, valvula_gas, tomadas);
    return sucesso ? res.json({ mensagem: "Atuadores atualizados" }) : res.status(404).json({ erro: "Não encontrado" });
  }

  excluir(req: Request, res: Response) {
    const sucesso = repo.excluir(Number(req.params.id));
    return sucesso ? res.status(204).send() : res.status(404).json({ erro: "Não encontrado" });
  }
}
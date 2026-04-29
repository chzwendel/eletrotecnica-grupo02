import db from "../database/database";
import { Ambiente } from "../models/Ambiente";

export class AmbienteRepository {
  salvar(ambiente: Ambiente): Ambiente {
    const sql = `
      INSERT INTO ambiente (estado, ventilacao, valvula_gas, tomadas) 
      VALUES (?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      ambiente.estado,
      ambiente.ventilacao,
      ambiente.valvula_gas,
      ambiente.tomadas
    );

    return { 
      ...ambiente, 
      id: Number(resultado.lastInsertRowid) 
    } as Ambiente;
  }

  buscarAtual(): Ambiente | null {
    const sql = "SELECT * FROM ambiente ORDER BY id DESC LIMIT 1";
    const registro = db.prepare(sql).get() as Ambiente | undefined;
    return registro ?? null;
  }

  listarHistoricoEstados(): Ambiente[] {
    return db.prepare("SELECT * FROM ambiente ORDER BY Created_at DESC").all() as Ambiente[];
  }

  atualizarEstado(id: number, novoEstado: Ambiente['estado']): boolean {
    const sql = "UPDATE ambiente SET estado = ? WHERE id = ?";
    const resultado = db.prepare(sql).run(novoEstado, id);
    return resultado.changes > 0;
  }

  atualizarAtuadores(id: number, ventilacao: string, valvula: string, tomadas: string): boolean {
    const sql = `
      UPDATE ambiente 
      SET ventilacao = ?, valvula_gas = ?, tomadas = ? 
      WHERE id = ?
    `;
    const resultado = db.prepare(sql).run(ventilacao, valvula, tomadas, id);
    return resultado.changes > 0;
  }

  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM ambiente WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}
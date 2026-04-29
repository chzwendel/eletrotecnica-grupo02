import db from "../database/database";
import { Historico } from "../models/Historico";

export class HistoricoRepository {
  salvar(historico: Historico): Historico {
    const sql = `
      INSERT INTO historico (sensor_id, valor, descricao, numero_tel, data_evento) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const dataFormatada = historico.data_evento instanceof Date 
      ? historico.data_evento.toISOString() 
      : historico.data_evento;

    const resultado = db.prepare(sql).run(
      historico.sensor_id,
      historico.valor,
      historico.descricao,
      historico.numero_tel,
      dataFormatada
    );

    return { 
      ...historico, 
      id: Number(resultado.lastInsertRowid) 
    } as Historico;
  }

  listarTodos(): Historico[] {
    return db.prepare("SELECT * FROM historico ORDER BY data_evento DESC").all() as Historico[];
  }

  buscarPorSensor(sensor_id: number): Historico[] {
    const sql = "SELECT * FROM historico WHERE sensor_id = ? ORDER BY data_evento DESC";
    return db.prepare(sql).all(sensor_id) as Historico[];
  }

  buscarPorTelefone(numero_tel: string): Historico[] {
    const sql = "SELECT * FROM historico WHERE numero_tel = ? ORDER BY data_evento DESC";
    return db.prepare(sql).all(numero_tel) as Historico[];
  }

  buscarPorPeriodo(dataInicio: string, dataFim: string): Historico[] {
    const sql = `
      SELECT * FROM historico 
      WHERE data_evento BETWEEN ? AND ? 
      ORDER BY data_evento ASC
    `;
    return db.prepare(sql).all(dataInicio, dataFim) as Historico[];
  }

  buscarPorId(id: number): Historico | null {
    const registro = db.prepare("SELECT * FROM historico WHERE id = ?").get(id) as Historico | undefined;
    return registro ?? null;
  }

  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM historico WHERE id = ?").run(id);
    return resultado.changes > 0;
  }

  limparHistoricoAntigo(dataLimite: string): number {
    const resultado = db.prepare("DELETE FROM historico WHERE data_evento < ?").run(dataLimite);
    return resultado.changes;
  }
}
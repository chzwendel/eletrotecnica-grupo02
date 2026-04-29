import db from "../database/database";
import { Sensor } from "../models/Sensor";

export class SensorRepository {
  salvar(sensor: Sensor): Sensor {
    const sql = `
      INSERT INTO sensor (nome, tipo, status, valor) 
      VALUES (?, ?, ?, ?)
    `;

    const resultado = db.prepare(sql).run(
      sensor.nome,
      sensor.tipo,
      sensor.status,
      sensor.valor
    );

    return { 
      ...sensor, 
      id: Number(resultado.lastInsertRowid) 
    } as Sensor;
  }

  listarTodos(): Sensor[] {
    return db.prepare("SELECT * FROM sensor").all() as Sensor[];
  }

  buscarPorId(id: number): Sensor | null {
    const sensor = db.prepare("SELECT * FROM sensor WHERE id = ?").get(id) as Sensor | undefined;
    return sensor ?? null;
  }

  buscarPorTipo(tipo: string): Sensor[] {
    const sql = "SELECT * FROM sensor WHERE tipo = ?";
    return db.prepare(sql).all(tipo) as Sensor[];
  }

  atualizarValor(id: number, novoValor: string): boolean {
    const resultado = db
      .prepare("UPDATE sensor SET valor = ? WHERE id = ?")
      .run(novoValor, id);
    return resultado.changes > 0;
  }

  atualizarStatus(id: number, novoStatus: 'ativo' | 'inativo'): boolean {
    const resultado = db
      .prepare("UPDATE sensor SET status = ? WHERE id = ?")
      .run(novoStatus, id);
    return resultado.changes > 0;
  }

  excluir(id: number): boolean {
    const resultado = db.prepare("DELETE FROM sensor WHERE id = ?").run(id);
    return resultado.changes > 0;
  }
}
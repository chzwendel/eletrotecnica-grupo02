import { app } from "../app";
import { HistoricoRepository } from "../repositories/HistoricoRepository";

export function HistoricoController() {
  const repository = new HistoricoRepository();

  // Criar um novo registro no histórico
  app.post("/historico", (req, res) => {
    try {
      const salvo = repository.salvar(req.body);
      return res.status(201).json(salvo);
    } catch (error) {
      return res.status(400).json({ erro: "Erro ao salvar registro" });
    }
  });

  // Listar todos ou filtrar por sensor via query (?sensor_id=X)
  app.get("/historico", (req, res) => {
    const { sensor_id } = req.query;

    const dados = sensor_id
      ? repository.buscarPorSensor(Number(sensor_id))
      : repository.listarTodos();

    return res.json(dados);
  });

  // Buscar um registro específico pelo ID
  app.get("/historico/:id", (req, res) => {
    const id = Number(req.params.id);
    const registro = repository.buscarPorId(id);

    if (!registro) return res.status(404).json({ erro: "Registro não encontrado" });
    return res.json(registro);
  });

  // Limpar registros antigos por data limite
  app.delete("/historico/limpar", (req, res) => {
    const { dataLimite } = req.body;
    const total = repository.limparHistoricoAntigo(dataLimite);
    return res.json({ removidos: total });
  });

  // Excluir um registro específico pelo ID
  app.delete("/historico/:id", (req, res) => {
    const id = Number(req.params.id);
    const sucesso = repository.excluir(id);

    if (!sucesso) return res.status(404).json({ erro: "Registro não encontrado" });
    return res.status(204).send();
  });
}
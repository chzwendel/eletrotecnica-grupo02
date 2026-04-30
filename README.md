
# 🛡️ Sistema de Segurança para Cozinha Industrial
### **Painel de Monitoramento de Sensores em Tempo Real**

Este projeto é um ecossistema **Fullstack** robusto, projetado para monitorar variáveis críticas em ambientes de alta temperatura e risco, como cozinhas industriais. A aplicação foca em confiabilidade e rapidez de resposta, utilizando uma arquitetura escalável e tipagem estrita.

---

## 🛠️ Stack Tecnológica

* **Frontend:** React com TypeScript (Interface reativa e intuitiva).
* **Backend:** Node.js, JavaScript e TypeScript.
* **Banco de Dados:** SQLite (Armazenamento local, *Zero-Installation*).
* **Ambiente de Dev:** * `ts-node`: Execução direta de TypeScript para agilidade máxima.
    * `Nodemon`: Hot-reload que reinicia o servidor automaticamente ao salvar.

---

## 🏛️ Arquitetura e Organização (Design Patterns)

O projeto foi dividido em camadas de responsabilidade única, demonstrando domínio em engenharia de software:

### 🧩 **Model (Camada de Domínio)**
Define a "espinha dorsal" do sistema. Aqui estão as **estruturas de entidade** e as classes que garantem que cada sensor ou log de segurança siga um contrato rigoroso de dados.

### 📂 **Repository (Persistência de Dados)**
Camada responsável por isolar o acesso aos dados. Contém toda a lógica de **criação de entidades** e os **SELECTS** otimizados, garantindo que o restante da aplicação não precise saber como o banco de dados funciona.

### 🕹️ **Controller (Fluxo e API REST)**
Funciona como o cérebro da operação. Gerencia as rotas da **API REST**, estabelece a **conexão com o Frontend** e aplica as **validações** necessárias antes de processar qualquer informação.

### 💾 **Database (Integração)**
Configuração especializada para **SQLite**. A escolha do banco local permite que o sistema seja portátil e resiliente, funcionando sem a necessidade de servidores de banco de dados externos pesados.

---

## ⚡ Diferenciais de Performance

* **Runtime Dinâmico:** O uso do `ts-node` permite testar funcionalidades em tempo real sem a espera de processos longos de compilação.
* **Integração Contínua:** Com o `Nodemon`, o ciclo de feedback é instantâneo, permitindo ajustes rápidos na lógica dos sensores.
* **Segurança de Tipagem:** O TypeScript é utilizado do Controller ao Repository para mitigar erros comuns de lógica e dados nulos.

---

## 🚀 Como Iniciar

1.  **Clone o repositório:**
    `git clone https://github.com/chzwendel/eletrotecnica-grupo02.git`
2.  **Instale as dependências:**
    `npm install`
3.  **Execute o servidor de desenvolvimento:**
    `npm run dev`
    *(O SQLite será configurado automaticamente no primeiro boot)*

---

## 👨‍💻 Contato

* **LinkedIn:** [Christian Wendel] www.linkedin.com/in/christian-wendel-6bb79836a


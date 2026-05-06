// ------------------------------------------------------------
// ENTRADAS (sensores do sistema)
// ------------------------------------------------------------
const int PIN_S_CALOR        = A0;  // Detecta aumento de temperatura
const int PIN_S_FUMACA       = A1;  // Detecta presença de fumaça
const int PIN_S_GLP          = A2;  // Detecta vazamento de gás
const int PIN_S_MOVIMENTO    = A3;  // Detecta presença de pessoas
const int PIN_BTN_EMERGENCIA = 2;   // Botão manual de emergência

// ------------------------------------------------------------
// SAÍDAS (atuadores do sistema)
// ------------------------------------------------------------
const int PIN_ALARME          = 3;  // Sirene/buzzer
const int PIN_LED_PERIGO      = 4;  // Indicador visual
const int PIN_VENTILACAO      = 5;  // Controle da ventilação
const int PIN_VALVULA_GAS     = 6;  // Controle da válvula de gás
const int PIN_ENERGIA_TOMADAS = 7;  // Alimentação dos equipamentos
const int PIN_BOMBA_HIDRANTE  = 8;  // Sistema de água
const int PIN_CILINDRO_CO2    = 9;  // Sistema de CO2

// ------------------------------------------------------------
// VARIÁVEIS DE ESTADO DOS SENSORES
// ------------------------------------------------------------
bool calor, fumaca, glp, movimento, emergencia;

// ============================================================
// SETUP — configuração inicial
// ============================================================
void setup() {
  Serial.begin(9600);

  // Configuração das entradas
  pinMode(PIN_S_CALOR, INPUT);
  pinMode(PIN_S_FUMACA, INPUT);
  pinMode(PIN_S_GLP, INPUT);
  pinMode(PIN_S_MOVIMENTO, INPUT);
  pinMode(PIN_BTN_EMERGENCIA, INPUT_PULLUP); // LOW = pressionado

  // Configuração das saídas
  pinMode(PIN_ALARME, OUTPUT);
  pinMode(PIN_LED_PERIGO, OUTPUT);
  pinMode(PIN_VENTILACAO, OUTPUT);
  pinMode(PIN_VALVULA_GAS, OUTPUT);
  pinMode(PIN_ENERGIA_TOMADAS, OUTPUT);
  pinMode(PIN_BOMBA_HIDRANTE, OUTPUT);
  pinMode(PIN_CILINDRO_CO2, OUTPUT);

  resetarSaidas(); // Garante estado seguro inicial
}

// ============================================================
// LOOP PRINCIPAL
// ============================================================
void loop() {
  lerSensores();      // Atualiza estado das entradas
  avaliarSistema();   // Aplica regras de decisão
  delay(100);
}

// ============================================================
// LEITURA DOS SENSORES
// ============================================================
void lerSensores() {
  calor     = digitalRead(PIN_S_CALOR);
  fumaca    = digitalRead(PIN_S_FUMACA);
  glp       = digitalRead(PIN_S_GLP);
  movimento = digitalRead(PIN_S_MOVIMENTO);

  // Botão com pull-up: pressionado = LOW
  emergencia = digitalRead(PIN_BTN_EMERGENCIA) == LOW;
}

// ============================================================
// LÓGICA DO SISTEMA (ordem de prioridade)
// ============================================================
void avaliarSistema() {

  // 1. Emergência tem prioridade máxima
  if (emergencia) {
    modoEmergencia();
    return;
  }

  // 2. Situação mais crítica: calor + fumaça + gás
  if (calor && fumaca && glp) {
    incendioComGas();

    // Decide ação com base na presença de pessoas
    if (!movimento) {
      acionarSupressao();     // Ambiente vazio → combate automático
    } else {
      alertaPessoaEmRisco();  // Pessoa presente → apenas alerta
    }
    return;
  }

  // 3. Incêndio inicial (sem gás)
  if (calor && fumaca) {
    incendioInicial();
    return;
  }

  // 4. Apenas aumento de temperatura
  if (calor) {
    alertaCalor();
    return;
  }

  // 5. Nenhum risco detectado
  estadoNormal();
}

// FUNÇÕES DE AÇÃO

// Situação simples: apenas calor detectado
void alertaCalor() {
  resetarSaidas();
  digitalWrite(PIN_ALARME, HIGH);
  digitalWrite(PIN_LED_PERIGO, HIGH);
}

// Incêndio inicial: calor + fumaça
void incendioInicial() {
  resetarSaidas();
  digitalWrite(PIN_ALARME, HIGH);
  digitalWrite(PIN_LED_PERIGO, HIGH);
  digitalWrite(PIN_VENTILACAO, LOW);      // Desliga ventilação
  digitalWrite(PIN_VALVULA_GAS, LOW);     // Fecha gás
  digitalWrite(PIN_ENERGIA_TOMADAS, LOW); // Corta energia
}

// Incêndio com risco de explosão (gás presente)
void incendioComGas() {
  resetarSaidas();
  digitalWrite(PIN_ALARME, HIGH);
  digitalWrite(PIN_LED_PERIGO, HIGH);
  digitalWrite(PIN_VALVULA_GAS, LOW); // Fecha gás
}

// Combate automático (sem pessoas no local)
void acionarSupressao() {
  digitalWrite(PIN_BOMBA_HIDRANTE, HIGH);
  digitalWrite(PIN_CILINDRO_CO2, HIGH);
}

// Pessoa presente em área de risco
void alertaPessoaEmRisco() {
  // Alarme e LED já ativos — aqui poderia adicionar sinalização extra
}

// Sistema sem riscos
void estadoNormal() {
  resetarSaidas();
}

// Botão de emergência acionado
void modoEmergencia() {
  resetarSaidas();

  digitalWrite(PIN_ALARME, HIGH);
  digitalWrite(PIN_LED_PERIGO, HIGH);
  digitalWrite(PIN_VENTILACAO, LOW);
  digitalWrite(PIN_VALVULA_GAS, LOW);
  digitalWrite(PIN_ENERGIA_TOMADAS, LOW);

  // Só ativa combate automático se não houver pessoas
  if (!movimento) {
    digitalWrite(PIN_BOMBA_HIDRANTE, HIGH);
    digitalWrite(PIN_CILINDRO_CO2, HIGH);
  }
}

// ============================================================
// RESET DAS SAÍDAS
// Define estado seguro padrão
// ============================================================
void resetarSaidas() {
  digitalWrite(PIN_ALARME, LOW);
  digitalWrite(PIN_LED_PERIGO, LOW);

  digitalWrite(PIN_VENTILACAO, HIGH);      // Ligada (normal)
  digitalWrite(PIN_VALVULA_GAS, HIGH);     // Aberta (normal)
  digitalWrite(PIN_ENERGIA_TOMADAS, HIGH); // Energia ativa

  digitalWrite(PIN_BOMBA_HIDRANTE, LOW);
  digitalWrite(PIN_CILINDRO_CO2, LOW);
}
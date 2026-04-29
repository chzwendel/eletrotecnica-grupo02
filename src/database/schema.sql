    CREATE TABLE ambiente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estado TEXT NOT NULL CHECK (estado IN ('normal', 'alerta', 'incendio', 'explosao', 'emergencia')),
    ventilacao VARCHAR (100) NOT NULL,
    valvula_gas VARCHAR (100) NOT NULL,
    tomadas VARCHAR (100) NOT NULL,
    Creatd_at DATETIME DEFAULT (datetime('now', 'localtime'))
);

CREATE TABLE sensor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR (100) NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('temperatura', 'gas', 'movimento', 'calor')),
    status TEXT NOT NULL CHECK (status IN ('ativo', 'inativo')),
    valor VARCHAR (100)
);

CREATE TABLE historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_id INTEGER NOT NULL,
    valor VARCHAR (100),
    descricao VARCHAR(100),
    numero_tel VARCHAR (11),
    data_evento DATETIME DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (sensor_id) REFERENCES sensor(id) ON DELETE CASCADE
);

CREATE INDEX idx_historico_sensor ON historico(sensor_id);
CREATE INDEX idx_historico_data ON historico(data_evento);
export interface Ambiente {
    id?: number;
    estado: 'normal' | 'alerta' | 'incendio' | 'explosao' | 'emergencia';
    ventilacao: string;
    valvula_gas: string;
    tomadas: string;
    data: Date;
}
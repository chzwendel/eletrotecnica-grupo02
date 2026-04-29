export interface Sensor {
    id?: number;
    nome: string;
    tipo: 'temperatura' | 'gas' | 'movimento' | 'calor';
    status: 'ativo' | 'inativo';
    valor: string;
}
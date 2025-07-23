export interface Infraccion {
  numeroExpediente: string;
  agenteId: number;
  personaId: string;
  vehiculoId: string | null;
  fecha: string;
  articuloInfringido: string;
  carretera: string;
  kilometro: string;
  direccion: string;
  importe: number;
  estado: string;
}

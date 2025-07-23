export interface Agente {
  id?: number;
  nombre?: string;
  unidad?: UnidadTransito;
}

export interface UnidadTransito {
  id?: number;
  nombre: string;
  agentes?: Agente[];
}

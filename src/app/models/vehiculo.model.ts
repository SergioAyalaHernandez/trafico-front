export interface VehiculoModel {
  bastidor: string;
  matricula: string;
  fechaMatriculacion: string;
  modelo?: Modelo | null;
  propietarios: PropiedadVehiculo[];
}

export interface Modelo {
  id: number;
  nombre: string;
  potencia: string;
  marca: Marca;
}

export interface Marca {
  id: number;
  nombre: string;
}

export interface PropiedadVehiculo {
  id: number;
  vehiculo?: VehiculoModel | null;
  propietario: Persona;
  fechaInicio: string;
  fechaFin: string | null;
  activo: boolean | null;// Puede ser null
}

export interface Persona {
  nit: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  calle: string;
  numero: string;
  municipio: string;
  provincia: string;
  codigoPostal: string;
  sexo: string;
}

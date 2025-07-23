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

 export interface Vehiculo {
   matricula?: string;
   marca?: string;
   modelo?: string;
 }

 export interface Unidad {
   id: number;
   nombre: string;
 }

 export interface Agente {
   id: number;
   persona: Persona;
   unidad: Unidad;
 }

 export interface InfraccionEntity {
   numeroExpediente: number;
   persona: Persona;
   vehiculo: Vehiculo | null;
   fecha: string;
   articuloInfringido: string;
   carretera: string;
   kilometro: string;
   direccion: string;
   importe: number;
   estado: string;
   agente: Agente;
 }

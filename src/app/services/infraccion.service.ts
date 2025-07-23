import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Infraccion} from "../models/infraccion.model";
import {InfraccionEntity} from "../models/infraccion.entity";

@Injectable({
  providedIn: 'root'
})
export class InfraccionService {
  private apiUrl = environment.apiUrl + '/api/infracciones';

  constructor(private http: HttpClient) { }

  crearInfraccion(infraccion: Infraccion) {
    return this.http.post<InfraccionEntity>(this.apiUrl, infraccion);
  }

  obtenerInfraccionPorExpediente(numeroExpediente: number) {
    return this.http.get<InfraccionEntity>(`${this.apiUrl}/${numeroExpediente}`);
  }

  obtenerTodasInfracciones() {
    return this.http.get<InfraccionEntity[]>(this.apiUrl);
  }

  actualizarInfraccion(numeroExpediente: number, infraccion: Infraccion) {
    return this.http.put<InfraccionEntity>(`${this.apiUrl}/${numeroExpediente}`, infraccion);
  }

  eliminarInfraccion(numeroExpediente: number) {
    return this.http.delete<void>(`${this.apiUrl}/${numeroExpediente}`);
  }
}

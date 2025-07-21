import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ModeloDTO} from "../models/modelo.dto";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  crearModelo(data: ModeloDTO) {
    return this.http.post(`${this.apiUrl}/modelos`, data);
  }

  obtenerModelos() {
    return this.http.get(`${this.apiUrl}/modelos`);
  }

  obtenerModeloPorId(id: number) {
    return this.http.get(`${this.apiUrl}/modelos/${id}`);
  }

  eliminarModelo(id: number) {
    return this.http.delete(`${this.apiUrl}/modelos/${id}`);
  }

  actualizarModelo(id: number, data: ModeloDTO) {
    return this.http.put(`${this.apiUrl}/modelos/${id}`, data);
  }
}

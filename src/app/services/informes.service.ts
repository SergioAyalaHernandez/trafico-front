import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InformesService {
  private apiUrl = environment.apiUrl + '/api/informes';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las infracciones por carretera
   */
  getInfraccionesPorCarretera(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/infracciones-por-carretera`);
  }

  /**
   * Obtiene las infracciones por importe
   */
  getInfraccionesPorImporte(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/infracciones-por-importe`);
  }

  /**
   * Obtiene los artículos infringidos
   */
  getArticulosInfringidos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articulos-infringidos`);
  }

  /**
   * Obtiene las infracciones por unidad
   * @param unidadId ID de la unidad
   */
  getInfraccionesPorUnidad(unidadId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/infracciones-por-unidad/${unidadId}`);
  }

  /**
   * Obtiene la demografía de los infractores
   */
  getDemografiaInfractores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/demografia-infractores`);
  }

  /**
   * Obtiene las infracciones por edad y sexo
   */
  getInfraccionesPorEdadSexo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/infracciones-por-edad-sexo`);
  }

  /**
   * Obtiene las infracciones por tipo de vehículo
   */
  getInfraccionesPorVehiculo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/infracciones-por-vehiculo`);
  }
}

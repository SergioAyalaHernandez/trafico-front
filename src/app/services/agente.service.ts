import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private apiUrl = environment.apiUrl + '/api/agentes';

  constructor(private http: HttpClient) {
  }

  getAgentes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAgenteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAgente(agente: { personaId: string, unidadTransitoId: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, agente);
  }

  deleteAgente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateUnidadTransito(agenteId: number, unidadId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${agenteId}/unidad/${unidadId}`, {});
  }

}

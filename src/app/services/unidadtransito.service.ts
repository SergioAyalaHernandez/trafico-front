import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UnidadTransito} from "../models/unidad-transito.model";

@Injectable({
  providedIn: 'root'
})
export class UnidadtransitoService {
  private apiUrl = environment.apiUrl + '/unidades';

  constructor(private http: HttpClient) {
  }

  createUnidad(unidad: UnidadTransito): Observable<UnidadTransito> {
    return this.http.post<UnidadTransito>(this.apiUrl, unidad);
  }

  getAllUnidades(): Observable<UnidadTransito[]> {
    return this.http.get<UnidadTransito[]>(this.apiUrl);
  }

  getUnidadById(id: number): Observable<UnidadTransito> {
    return this.http.get<UnidadTransito>(`${this.apiUrl}/${id}`);
  }

  deleteUnidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Marca} from "../models/marca.model";

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = environment.apiUrl + '/marcas';

  constructor(private http: HttpClient) { }

  // Crear una marca (POST)
  crearMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  // Obtener una marca por id (GET)
  obtenerMarcaPorId(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  // Obtener todas las marcas (GET)
  obtenerTodasLasMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  // Actualizar una marca (PUT)
  actualizarMarca(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca);
  }

  // Eliminar una marca (DELETE)
  eliminarMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

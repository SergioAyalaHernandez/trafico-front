import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Persona} from "../models/persona.dto";



@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private apiUrl = environment.apiUrl + '/api/personas';

  constructor(private http: HttpClient) {
  }

  // POST - Crear una persona
  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  // GET - Obtener una persona por NIT
  obtenerPersonaPorNit(nit: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${nit}`);
  }

  // GET - Obtener todas las personas
  obtenerTodasLasPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  // PUT - Actualizar una persona
  actualizarPersona(nit: string, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${nit}`, persona);
  }

  // DELETE - Eliminar una persona
  eliminarPersona(nit: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${nit}`);
  }
}

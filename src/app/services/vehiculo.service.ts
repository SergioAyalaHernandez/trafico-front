import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";
import {Vehiculo} from "../models/vehiculo.dto";
import {environment} from "../../environments/environment";
import {VehiculoModel, Modelo, Marca, PropiedadVehiculo, Persona} from "../models/vehiculo.model";

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = environment.apiUrl + '/api/vehiculos';

  constructor(private http: HttpClient) { }

  crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, vehiculo);
  }

  obtenerVehiculos(): Observable<VehiculoModel[]> {
    return this.http.get<VehiculoModel[]>(this.apiUrl);
  }

  obtenerVehiculoPorBastidor(bastidor: string): Observable<VehiculoModel> {
    return this.http.get<VehiculoModel>(`${this.apiUrl}/${bastidor}`);
  }

  obtenerVehiculoPorMatricula(matricula: string): Observable<VehiculoModel> {
    return this.http.get<VehiculoModel>(`${this.apiUrl}/matricula/${matricula}`);
  }

  eliminarVehiculo(bastidor: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bastidor}`);
  }

  verificarPropietario(propietarioId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-propietario/${propietarioId}`);
  }

  cambiarPropietario(bastidor: string, propietarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bastidor}/propietarios/${propietarioId}`, {});
  }
}

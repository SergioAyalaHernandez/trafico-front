import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {VehiculoService} from "../../../services/vehiculo.service";
import {Marca, Persona, VehiculoModel} from "../../../models/vehiculo.model";
import {MarcaService} from "../../../services/marca.service";
import {ModeloService} from "../../../services/modelo.service";
import {PersonasService} from "../../../services/personas.service";

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  vehiculos: VehiculoModel[] = [];
  vehiculoForm: FormGroup;
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  vehiculoSeleccionado: VehiculoModel | null = null;
  personaEncontrada: Persona | null = null;
  personaNoEncontrada = false;
  bastidorVerificado: boolean = false;
  matriculaVerificado: boolean = false;
  mostrarModalCambiarPropietario = false;
  nuevoPropietarioNit: string = '';
  nuevoPersonaEncontrada: any = null;
  nuevoPersonaNoEncontrada = false;
  matriculaExistente: boolean = false;

  modelos: any[] = [];
  marcas: Marca[] = [];
  propietarios: Persona[] = [];

  constructor(
    private vehiculoService: VehiculoService,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private personaService: PersonasService,
    private fb: FormBuilder
  ) {
    this.vehiculoForm = this.fb.group({
      bastidor: [''],
      matricula: [''],
      fechaMatriculacion: [''],
      modeloId: [''],
      propietarioId: ['']
    });
  }

  ngOnInit(): void {
    this.cargarVehiculos();
    this.cargarModelos();
    this.cargarMarcas();
    this.cargarPropietarios();
  }

  cargarModelos() {
    this.modeloService.obtenerModelos().subscribe((data: any) => {
      this.modelos = data;
    });
  }

  cargarMarcas() {
    this.marcaService.obtenerTodasLasMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  cargarPropietarios() {
    this.personaService.obtenerTodasLasPersonas().subscribe(data => {
      this.propietarios = data;
    });
  }

  cargarVehiculos() {
    this.vehiculoService.obtenerVehiculos().subscribe(data => {
      this.vehiculos = data;
    });
  }

  abrirModalCrear() {
    this.vehiculoForm.reset();
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  guardarVehiculo() {
    if (this.vehiculoForm.valid) {
      this.vehiculoService.crearVehiculo(this.vehiculoForm.value).subscribe(() => {
        this.cargarVehiculos();
        this.cerrarModalCrear();
      });
    }
  }

  abrirModalVer(vehiculo: VehiculoModel) {
    this.vehiculoService.obtenerVehiculoPorBastidor(vehiculo.bastidor).subscribe(
      (respuesta) => {
        this.vehiculoSeleccionado = respuesta;
        this.mostrarModalVer = true;
      }
    );
  }

  cerrarModalVer() {
    this.mostrarModalVer = false;
    this.vehiculoSeleccionado = null;
  }

  abrirModalEditar(vehiculo: VehiculoModel) {
    this.vehiculoSeleccionado = vehiculo;
    this.vehiculoForm.patchValue(vehiculo);
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.vehiculoSeleccionado = null;
  }

  actualizarVehiculo() {
    if (this.vehiculoForm.valid && this.vehiculoSeleccionado) {
      // Aquí deberías tener un método en el servicio para actualizar el vehículo
      // Por ejemplo: this.vehiculoService.actualizarVehiculo(this.vehiculoSeleccionado.bastidor, this.vehiculoForm.value)
      // .subscribe(() => { ... });
      // Por ahora solo cerramos el modal
      this.cerrarModalEditar();
      this.cargarVehiculos();
    }
  }

  abrirModalEliminar(vehiculo: VehiculoModel) {
    this.vehiculoSeleccionado = vehiculo;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.vehiculoSeleccionado = null;
  }

  confirmarEliminar() {
    if (this.vehiculoSeleccionado) {
      this.vehiculoService.eliminarVehiculo(this.vehiculoSeleccionado.bastidor).subscribe(() => {
        this.cargarVehiculos();
        this.cerrarModalEliminar();
      });
    }
  }

  buscarPersonaPorNit(nit: string) {
    if (!nit) {
      this.personaEncontrada = null;
      this.personaNoEncontrada = false;
      return;
    }

    this.personaService.obtenerPersonaPorNit(nit).subscribe({
      next: (persona) => {
        this.personaEncontrada = persona;
        this.personaNoEncontrada = false;
      },
      error: (error) => {
        this.personaEncontrada = null;
        this.personaNoEncontrada = true;
        console.error('Error al obtener la persona', error);
      }
    });
  }

  buscarVehiculoPorBastidor(bastidor: string) {
    if (!bastidor) return;

    this.vehiculoService.obtenerVehiculoPorBastidor(bastidor).subscribe({
      next: (vehiculo) => {
        this.vehiculoSeleccionado = vehiculo;
        this.bastidorVerificado = true; // Marcar como verificado
      },
      error: (error) => {
        if (error.status === 404) {
          this.vehiculoSeleccionado = null;
          this.bastidorVerificado = true; // También marcar como verificado si no existe
        } else {
          console.error('Error al buscar el vehículo:', error);
          this.bastidorVerificado = false;
        }
      }
    });
  }

  buscarVehiculoPorMatricula(matricula: string) {
    if (!matricula) return;

    this.vehiculoService.obtenerVehiculoPorMatricula(matricula).subscribe({
      next: (vehiculo) => {
        this.vehiculoSeleccionado = vehiculo;
        this.matriculaVerificado = true; // Marcar como verificado
      },
      error: (error) => {
        if (error.status === 404) {
          this.vehiculoSeleccionado = null;
          this.matriculaVerificado = true;
        } else {
          console.error('Error al buscar el vehículo:', error);
          this.matriculaVerificado = false;
        }
      }
    });
  }

  abrirModalCambiarPropietario(vehiculo: any): void {
    this.vehiculoSeleccionado = vehiculo;
    this.nuevoPropietarioNit = '';
    this.nuevoPersonaEncontrada = null;
    this.nuevoPersonaNoEncontrada = false;
    this.mostrarModalCambiarPropietario = true;
  }

  cerrarModalCambiarPropietario(): void {
    this.mostrarModalCambiarPropietario = false;
    this.vehiculoSeleccionado = null;
  }

  buscarNuevoPropietario(): void {
    if (!this.nuevoPropietarioNit) return;

    this.nuevoPersonaNoEncontrada = false;
    this.nuevoPersonaEncontrada = null;

    this.personaService.obtenerPersonaPorNit(this.nuevoPropietarioNit).subscribe({
      next: (persona) => {
        this.nuevoPersonaEncontrada = persona;
      },
      error: (error) => {
        this.nuevoPersonaNoEncontrada = true;
        console.error('Error al buscar persona:', error);
      }
    });
  }

  confirmarCambioPropietario(): void {
    if (!this.vehiculoSeleccionado || !this.nuevoPersonaEncontrada) return;

    this.vehiculoService.cambiarPropietario(
      this.vehiculoSeleccionado.bastidor,
      this.nuevoPersonaEncontrada.nit
    ).subscribe({
      next: () => {
        this.cerrarModalCambiarPropietario();
        this.cargarVehiculos();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}


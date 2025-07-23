import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InfraccionService} from '../../../services/infraccion.service';
import {Infraccion} from '../../../models/infraccion.model';
import {PersonasService} from "../../../services/personas.service";
import {VehiculoService} from "../../../services/vehiculo.service";
import {AgenteService} from 'src/app/services/agente.service';
import {InfraccionEntity} from "../../../models/infraccion.entity";

@Component({
  selector: 'app-infraccion',
  templateUrl: './infraccion.component.html',
  styleUrls: ['./infraccion.component.scss']
})
export class InfraccionComponent implements OnInit {
  // Variables para modales
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  personaSeleccionada: any = null;
  vehiculoSeleccionado: any = null;
  agenteSeleccionado: any = null;
  mostrarSeccionVehiculo: boolean = false;

  // Lista de infracciones
  infracciones: InfraccionEntity[] = [];

  // Infracción seleccionada para operaciones
  infraccionSeleccionada: InfraccionEntity | null = null;

  // Formulario reactivo
  infraccionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private agenteService: AgenteService,
    private infraccionService: InfraccionService,
    private personaService: PersonasService,
    private vehiculoService: VehiculoService
  ) {
    this.infraccionForm = this.fb.group({
      agenteId: ['', Validators.required],
      personaId: ['', Validators.required],
      vehiculoId: [null],
      fecha: ['', Validators.required],
      articuloInfringido: ['', Validators.required],
      carretera: ['', Validators.required],
      kilometro: ['', Validators.required],
      direccion: ['', Validators.required],
      importe: ['', [Validators.required, Validators.min(0)]],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarInfracciones();
  }

  // Método para cargar todas las infracciones
  cargarInfracciones(): void {
    this.infraccionService.obtenerTodasInfracciones().subscribe({
      next: (data) => {
        this.infracciones = data;
      },
      error: (error) => {
        console.error('Error al cargar infracciones:', error);
      }
    });
  }

  // Métodos para gestionar el modal de creación
  abrirModalCrear(): void {
    this.infraccionForm.reset({
      importe: 0
    });
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
  }

  guardarInfraccion(): void {
    if (this.infraccionForm.valid) {
      const nuevaInfraccion = this.infraccionForm.value as Infraccion;
      this.infraccionService.crearInfraccion(nuevaInfraccion).subscribe({
        next: () => {
          this.cerrarModalCrear();
          this.cargarInfracciones();
        },
        error: (error) => {
          console.error('Error al guardar infracción:', error);
        }
      });
    } else {
      // Marcar campos como tocados para mostrar validaciones
      Object.keys(this.infraccionForm.controls).forEach(key => {
        this.infraccionForm.get(key)?.markAsTouched();
      });
    }
  }

  // Métodos para gestionar el modal de visualización
  abrirModalVer(infraccion: InfraccionEntity): void {
    this.infraccionSeleccionada = infraccion;
    this.mostrarModalVer = true;
  }

  cerrarModalVer(): void {
    this.mostrarModalVer = false;
    this.infraccionSeleccionada = null;
  }

  // Métodos para gestionar el modal de edición
  abrirModalEditar(infraccion: InfraccionEntity): void {
    this.infraccionSeleccionada = infraccion;
    this.infraccionForm.patchValue({
      numeroExpediente: infraccion.numeroExpediente,
      fecha: infraccion.fecha,
      // hora: infraccion.hora,
      // lugar: infraccion.lugar,
      // nitInfractor: infraccion.nitInfractor,
      // nombreInfractor: infraccion.nombreInfractor,
      // descripcion: infraccion.descripcion,
      importe: infraccion.importe
    });
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.infraccionSeleccionada = null;
  }

  actualizarInfraccion(): void {
    if (this.infraccionForm.valid && this.infraccionSeleccionada) {
      const infraccionActualizada = this.infraccionForm.value as Infraccion;
      const numeroExpediente = this.infraccionSeleccionada.numeroExpediente;

      this.infraccionService.actualizarInfraccion(numeroExpediente, infraccionActualizada).subscribe({
        next: () => {
          this.cerrarModalEditar();
          this.cargarInfracciones();
        },
        error: (error) => {
          console.error('Error al actualizar infracción:', error);
        }
      });
    } else {
      // Marcar campos como tocados para mostrar validaciones
      Object.keys(this.infraccionForm.controls).forEach(key => {
        this.infraccionForm.get(key)?.markAsTouched();
      });
    }
  }

  // Métodos para gestionar el modal de eliminación
  abrirModalEliminar(infraccion: InfraccionEntity): void {
    this.infraccionSeleccionada = infraccion;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.infraccionSeleccionada = null;
  }

  confirmarEliminar(): void {
    if (this.infraccionSeleccionada) {
      const numeroExpediente = this.infraccionSeleccionada.numeroExpediente;

      this.infraccionService.eliminarInfraccion(numeroExpediente).subscribe({
        next: () => {
          this.cerrarModalEliminar();
          this.cargarInfracciones();
        },
        error: (error) => {
          console.error('Error al eliminar infracción:', error);
        }
      });
    }
  }

  buscarVehiculoPorPlaca() {
    const placa = this.infraccionForm.get('vehiculoId')?.value;
    if (!placa) {
      // Mostrar mensaje de error
      return;
    }

    this.vehiculoService.obtenerVehiculoPorMatricula(placa).subscribe({
      next: (vehiculo) => {
        if (vehiculo) {
          this.vehiculoSeleccionado = vehiculo;
          this.infraccionForm.patchValue({
            vehiculoId: vehiculo.bastidor
          });
        } else {
          // Mostrar mensaje de "vehículo no encontrado"
          this.vehiculoSeleccionado = null;
          this.infraccionForm.patchValue({
            vehiculoId: null
          });
        }
      },
      error: (error) => {
        console.error('Error al buscar vehículo:', error);
        // Mostrar mensaje de error
      }
    });
  }

  buscarPersonaPorNit() {
    const nit = this.infraccionForm.get('personaId')?.value;

    if (!nit) {

      return;
    }

    this.personaService.obtenerPersonaPorNit(nit).subscribe({
      next: (persona) => {
        if (persona) {
          this.personaSeleccionada = persona;
          this.infraccionForm.patchValue({
            personaId: persona.nit
          });
        } else {
          // Mostrar mensaje de "persona no encontrada"
          this.personaSeleccionada = null;
          this.infraccionForm.patchValue({
            personaId: ''
          });
        }
      },
      error: (error) => {
        console.error('Error al buscar persona:', error);
        // Mostrar mensaje de error
      }
    });
  }

  buscarAgentePorId() {
    const idAgente = this.infraccionForm.get('agenteId')?.value;

    if (!idAgente) {
      return;
    }

    this.agenteService.getAgenteById(idAgente).subscribe({
      next: (agente) => {
        if (agente) {
          this.agenteSeleccionado = agente;
          this.infraccionForm.patchValue({
            agenteId: agente.id
          });
        } else {
          this.agenteSeleccionado = null;
          this.infraccionForm.patchValue({
            agenteId: ''
          });
        }
      },
      error: (err) => {
        this.agenteSeleccionado = null;
        this.infraccionForm.patchValue({
          agenteId: ''
        });
      }
    });
  }
}

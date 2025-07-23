import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgenteService} from "../../../services/agente.service";
import {UnidadtransitoService} from "../../../services/unidadtransito.service";
import {PersonasService} from "../../../services/personas.service";

@Component({
  selector: 'app-agentetransito',
  templateUrl: './agentetransito.component.html',
  styleUrls: ['./agentetransito.component.css']
})
export class AgentetransitoComponent implements OnInit{
// Variables para gestionar los datos
  agentes: any[] = [];
  personas: any[] = [];
  unidades: any[] = [];
  agenteSeleccionado: any = null;

  // Variables para gestionar los modales
  mostrarModalCrear: boolean = false;
  mostrarModalVer: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalEliminar: boolean = false;

  // Formulario para crear/editar agentes
  agenteForm: FormGroup;

  constructor(
    private agenteService: AgenteService,
    private unidadTransitoService: UnidadtransitoService,
    private personaService: PersonasService,
    private fb: FormBuilder,
  ) {
    this.agenteForm = this.fb.group({
      personaId: [null],
      unidadTransitoId: [null]
    });
  }

  ngOnInit(): void {
    this.cargarAgentes();
    this.cargarPersonas();
    this.cargarUnidades();
  }

  // Funciones para cargar datos
  cargarAgentes(): void {
    this.agenteService.getAgentes().subscribe({
      next: (data) => {
        this.agentes = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  cargarPersonas(): void {
    this.personaService.obtenerTodasLasPersonas().subscribe({
      next: (data) => {
        this.personas = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  cargarUnidades(): void {
    this.unidadTransitoService.getAllUnidades().subscribe({
      next: (data) => {
        this.unidades = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Funciones para modales de creación
  abrirModalCrear(): void {
    this.agenteForm.reset();
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
  }

  guardarAgente(): void {
    if (this.agenteForm.invalid) {
      return;
    }

    const agente = this.agenteForm.value;

    this.agenteService.createAgente(agente).subscribe({
      next: () => {
        this.cerrarModalCrear();
        this.cargarAgentes();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Funciones para modal de visualización
  abrirModalVer(agente: any): void {
    this.agenteSeleccionado = agente;
    this.mostrarModalVer = true;
  }

  cerrarModalVer(): void {
    this.mostrarModalVer = false;
  }

  // Funciones para modal de edición
  abrirModalEditar(agente: any): void {
    this.agenteSeleccionado = agente;
    this.agenteForm.patchValue({
      unidadTransitoId: agente.unidadTransito?.id || null
    });
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
  }

  actualizarAgente(): void {
    if (this.agenteForm.invalid) {
      return;
    }

    const unidadId = this.agenteForm.get('unidadTransitoId')?.value;

    this.agenteService.updateUnidadTransito(this.agenteSeleccionado.id, unidadId).subscribe({
      next: () => {
        this.cerrarModalEditar();
        this.cargarAgentes();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Funciones para modal de eliminación
  abrirModalEliminar(agente: any): void {
    this.agenteSeleccionado = agente;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminar(): void {
    this.agenteService.deleteAgente(this.agenteSeleccionado.id).subscribe({
      next: () => {
        this.cerrarModalEliminar();
        this.cargarAgentes();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}

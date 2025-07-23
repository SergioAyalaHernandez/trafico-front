import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadtransitoService } from '../../../services/unidadtransito.service';
import { UnidadTransito } from '../../../models/unidad-transito.model';


@Component({
  selector: 'app-unidadtransito',
  templateUrl: './unidadtransito.component.html',
  styleUrls: ['./unidadtransito.component.scss']
})
export class UnidadtransitoComponent implements OnInit {
  // Variables para los modales
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;

  // Variables para datos
  unidades: UnidadTransito[] = [];
  unidadSeleccionada: UnidadTransito | null = null;

  // Formulario
  unidadForm: FormGroup;

  constructor(
    private unidadService: UnidadtransitoService,
    private fb: FormBuilder
  ) {
    this.unidadForm = this.fb.group({
      nombre: ['', Validators.required],
      agentes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.cargarUnidades();
  }

  cargarUnidades(): void {
    this.unidadService.getAllUnidades().subscribe(
      (unidades) => {
        this.unidades = unidades;
      },
      (error) => {
        console.error('Error al cargar unidades', error);
      }
    );
  }

  // Métodos para modales
  abrirModalCrear(): void {
    this.unidadForm.reset();
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
  }

  abrirModalVer(unidad: UnidadTransito): void {
    this.unidadSeleccionada = unidad;
    this.mostrarModalVer = true;
  }

  cerrarModalVer(): void {
    this.mostrarModalVer = false;
    this.unidadSeleccionada = null;
  }

  abrirModalEditar(unidad: UnidadTransito): void {
    this.unidadSeleccionada = { ...unidad };
    this.unidadForm.patchValue({
      nombre: unidad.nombre
    });
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.unidadSeleccionada = null;
  }

  abrirModalEliminar(unidad: UnidadTransito): void {
    this.unidadSeleccionada = unidad;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.unidadSeleccionada = null;
  }

  // Métodos CRUD
  guardarUnidad(): void {
    if (this.unidadForm.valid) {
      const nuevaUnidad: UnidadTransito = {
        nombre: this.unidadForm.value.nombre
      };

      this.unidadService.createUnidad(nuevaUnidad).subscribe({
        next: () => {
          this.cargarUnidades();
          this.cerrarModalCrear();
        },
        error: (error) => {
          console.error('Error al crear unidad', error);
        }
      });
    }
  }

  actualizarUnidad(): void {
    if (this.unidadForm.valid && this.unidadSeleccionada && this.unidadSeleccionada.id) {
      const unidadActualizada: UnidadTransito = {
        id: this.unidadSeleccionada.id,
        nombre: this.unidadForm.value.nombre
      };

      // Nota: debes implementar updateUnidad en tu servicio
      // Ejemplo de implementación:
      // return this.http.put<UnidadTransito>(`${this.apiUrl}/${unidad.id}`, unidad);

      // Como alternativa, podrías usar:
      this.unidadService.createUnidad(unidadActualizada).subscribe({
        next: () => {
          this.cargarUnidades();
          this.cerrarModalEditar();
        },
        error: (error) => {
          console.error('Error al actualizar unidad', error);
        }
      });
    }
  }

  confirmarEliminar(): void {
    if (this.unidadSeleccionada && this.unidadSeleccionada.id) {
      this.unidadService.deleteUnidad(this.unidadSeleccionada.id).subscribe({
        next: () => {
          this.cargarUnidades();
          this.cerrarModalEliminar();
        },
        error: (error) => {
          console.error('Error al eliminar unidad', error);
        }
      });
    }
  }

}

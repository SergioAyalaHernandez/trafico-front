import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from '../../../services/modelo.service';
import { MarcaService } from '../../../services/marca.service';
import {Marca} from "../../../models/marca.model";

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {
  // Propiedades para los modelos y marcas
  modelos: any[] = [];
  marcas: Marca[] | undefined;
  modeloSeleccionado: any = null;

  // Propiedades para los modales
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;

  // Formulario reactivo
  modeloForm: FormGroup;

  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private fb: FormBuilder
  ) {
    this.modeloForm = this.fb.group({
      nombre: ['', Validators.required],
      marcaId: [null, Validators.required],
      potencia: ['']
    });
  }

  ngOnInit(): void {
    this.cargarModelos();
    this.cargarMarcas();
  }

  // Métodos para cargar datos
  cargarModelos() {
    this.modeloService.obtenerModelos().subscribe((data: any) => {
      this.modelos = data;
    });
  }

  cargarMarcas() {
    this.marcaService.obtenerTodasLasMarcas().subscribe((data: Marca[]) => {
      this.marcas = data;
    });
  }

  // Métodos para los modales de creación
  abrirModalCrear() {
    this.modeloForm.reset();
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  guardarModelo() {
    if (this.modeloForm.valid) {
      this.modeloService.crearModelo(this.modeloForm.value).subscribe({
        next: () => {
          this.cerrarModalCrear();
          this.cargarModelos();
        },
        error: (error) => {
          console.error('Error al crear el modelo', error);
        }
      });
    }
  }

  // Métodos para los modales de visualización
  abrirModalVer(modelo: any) {
    this.modeloSeleccionado = modelo;
    this.mostrarModalVer = true;
  }

  cerrarModalVer() {
    this.mostrarModalVer = false;
    this.modeloSeleccionado = null;
  }

  // Métodos para los modales de edición
  abrirModalEditar(modelo: any) {
    this.modeloSeleccionado = modelo;
    this.modeloForm.patchValue({
      nombre: modelo.nombre,
      marcaId: modelo.marca?.id,
      descripcion: modelo.descripcion
    });
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.modeloSeleccionado = null;
  }

  actualizarModelo() {
    if (this.modeloForm.valid && this.modeloSeleccionado) {
      const modeloActualizado = {
        ...this.modeloForm.value,
        id: this.modeloSeleccionado.id
      };

      // Necesitas añadir este método al servicio ModeloService
      this.modeloService.actualizarModelo(this.modeloSeleccionado.id,modeloActualizado).subscribe({
        next: () => {
          this.cerrarModalEditar();
          this.cargarModelos();
        },
        error: (error) => {
          console.error('Error al actualizar el modelo', error);
        }
      });
    }
  }

  // Métodos para los modales de eliminación
  abrirModalEliminar(modelo: any) {
    this.modeloSeleccionado = modelo;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.modeloSeleccionado = null;
  }

  confirmarEliminar() {
    if (this.modeloSeleccionado) {
      this.modeloService.eliminarModelo(this.modeloSeleccionado.id).subscribe({
        next: () => {
          this.cerrarModalEliminar();
          this.cargarModelos();
        },
        error: (error) => {
          console.error('Error al eliminar el modelo', error);
        }
      });
    }
  }

}

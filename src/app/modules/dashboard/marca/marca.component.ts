import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import {Marca} from "../../../models/marca.model";


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {
  marcas: Marca[] = [];
  marcaSeleccionada: Marca | null = null;
  marcaForm: FormGroup;
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;

  constructor(
    private marcaService: MarcaService,
    private fb: FormBuilder
  ) {
    this.marcaForm = this.fb.group({
      nombre: ['', Validators.required],
      direccionSocial: ['']
    });
  }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas(): void {
    this.marcaService.obtenerTodasLasMarcas().subscribe({
      next: (data) => {
        this.marcas = data ;
      },
      error: (error) => {
        console.error('Error al cargar las marcas:', error);
      }
    });
  }

  seleccionarMarca(marca: Marca): void {
    this.marcaSeleccionada = marca;

    if (document.getElementById('editarMarcaModal')?.classList.contains('show')) {
      this.marcaForm.patchValue({
        nombre: marca.nombre,
        descripcion: marca.direccionSocial
      });
    }
  }

  guardarMarca(): void {
    if (this.marcaForm.valid) {
      const nuevaMarca: Marca = this.marcaForm.value;

      this.marcaService.crearMarca(nuevaMarca).subscribe({
        next: () => {
          this.cargarMarcas();
          this.cerrarModalCrear();
        },
        error: (error) => {
          console.error('Error al crear la marca:', error);
        }
      });
    }
  }

  actualizarMarca(): void {
    if (this.marcaForm.valid && this.marcaSeleccionada) {
      const marcaActualizada: Marca = {
        ...this.marcaSeleccionada,
        ...this.marcaForm.value
      };

      this.marcaService.actualizarMarca(this.marcaSeleccionada.id, marcaActualizada).subscribe({
        next: () => {
          this.cargarMarcas();
          this.cerrarModalEditar();
        },
        error: (error) => {
          console.error('Error al actualizar la marca:', error);
        }
      });
    }
  }

  confirmarEliminar(): void {
    if (this.marcaSeleccionada) {
      this.marcaService.eliminarMarca(this.marcaSeleccionada.id).subscribe({
        next: () => {
          this.cargarMarcas();
          this.cerrarModalEliminar();
        },
        error: (error) => {
          console.error('Error al eliminar la marca:', error);
        }
      });
    }
  }

  // Métodos para abrir modales
  abrirModalCrear() {
    this.marcaForm.reset();
    this.mostrarModalCrear = true;
  }

  abrirModalVer(marca: any) {
    this.seleccionarMarca(marca);
    this.mostrarModalVer = true;
  }

  abrirModalEditar(marca: any) {
    this.seleccionarMarca(marca);
    this.mostrarModalEditar = true;
  }

  abrirModalEliminar(marca: any) {
    this.seleccionarMarca(marca);
    this.mostrarModalEliminar = true;
  }

  // Métodos para cerrar modales
  cerrarModalCrear() {
    this.mostrarModalCrear = false;
  }

  cerrarModalVer() {
    this.mostrarModalVer = false;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
  }
}

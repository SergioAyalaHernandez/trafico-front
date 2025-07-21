import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../../services/personas.service';
import { Persona } from '../../../models/persona.dto';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  // Variables para controlar la visibilidad de los modales
  mostrarModalCrear = false;
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;

  // Formulario reactivo para crear/editar personas
  personaForm: FormGroup;

  // Lista de personas y persona seleccionada
  personas: Persona[] = [];
  personaSeleccionada: Persona | null = null;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService
  ) {
    this.personaForm = this.fb.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      municipio: ['', Validators.required],
      provincia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      sexo: ['M', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  // Método para cargar la lista de personas
  cargarPersonas(): void {
    this.personasService.obtenerTodasLasPersonas().subscribe(
      (personas) => {
        this.personas = personas;
      },
      (error) => {
        console.error('Error al cargar personas:', error);
      }
    );
  }

  // Métodos para abrir y cerrar el modal de creación
  abrirModalCrear(): void {
    this.personaForm.reset({
      sexo: 'M' // Valor por defecto
    });
    this.mostrarModalCrear = true;
  }

  cerrarModalCrear(): void {
    this.mostrarModalCrear = false;
  }

  // Método para guardar una nueva persona
  guardarPersona(): void {
    if (this.personaForm.valid) {
      const nuevaPersona: Persona = this.personaForm.value;
      this.personasService.crearPersona(nuevaPersona).subscribe(
        () => {
          this.cerrarModalCrear();
          this.cargarPersonas(); // Recargar la lista
        },
        (error) => {
          console.error('Error al crear persona:', error);
        }
      );
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.personaForm.controls).forEach(key => {
        const control = this.personaForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Métodos para abrir y cerrar el modal de visualización
  abrirModalVer(persona: Persona): void {
    this.personaSeleccionada = persona;
    this.mostrarModalVer = true;
  }

  cerrarModalVer(): void {
    this.mostrarModalVer = false;
    this.personaSeleccionada = null;
  }

  // Métodos para abrir y cerrar el modal de edición
  abrirModalEditar(persona: Persona): void {
    this.personaSeleccionada = persona;
    this.personaForm.patchValue(persona);
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.personaSeleccionada = null;
  }

  // Método para actualizar una persona
  actualizarPersona(): void {
    if (this.personaForm.valid && this.personaSeleccionada) {
      const personaActualizada: Persona = this.personaForm.value;
      this.personasService.actualizarPersona(this.personaSeleccionada.nit, personaActualizada).subscribe(
        () => {
          this.cerrarModalEditar();
          this.cargarPersonas(); // Recargar la lista
        },
        (error) => {
          console.error('Error al actualizar persona:', error);
        }
      );
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.personaForm.controls).forEach(key => {
        const control = this.personaForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Métodos para abrir y cerrar el modal de eliminación
  abrirModalEliminar(persona: Persona): void {
    this.personaSeleccionada = persona;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.personaSeleccionada = null;
  }

  // Método para confirmar la eliminación de una persona
  confirmarEliminar(): void {
    if (this.personaSeleccionada) {
      this.personasService.eliminarPersona(this.personaSeleccionada.nit).subscribe(
        () => {
          this.cerrarModalEliminar();
          this.cargarPersonas(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar persona:', error);
        }
      );
    }
  }
}

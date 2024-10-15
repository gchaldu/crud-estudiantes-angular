import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../interface/estudiante.interface';

@Component({
  selector: 'app-add-estudiante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-estudiante.component.html',
  styleUrl: './add-estudiante.component.css'
})
export class AddEstudianteComponent {
  @Output()
  estudianteEmit: EventEmitter<Estudiante> = new EventEmitter();

  estudiante: Estudiante = {
    nombre: '',
    apellido: '',
    email: ''
  }

  enviandoEstudiante() {
    this.estudianteEmit.emit(this.estudiante);
    this.estudiante = { nombre: '', apellido: '', email: '' }
  }
}

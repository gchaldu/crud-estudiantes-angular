import { Component } from '@angular/core';
import { AddEstudianteComponent } from '../add-estudiante/add-estudiante.component';
import { Estudiante } from '../../interface/estudiante.interface';
import { EstudianteService } from '../../service/estudiante.service';

@Component({
  selector: 'app-list-estudiante',
  standalone: true,
  imports: [AddEstudianteComponent],
  templateUrl: './list-estudiante.component.html',
  styleUrl: './list-estudiante.component.css'
})
export class ListEstudianteComponent {

  public listaEstudiantes: Estudiante[] = [];
  constructor(private serviceEstudiante: EstudianteService) { }

  ngOnInit(): void {
    this.serviceEstudiante.getEstudianteBasic().subscribe(estudiantes => {
      this.listaEstudiantes = estudiantes;
      console.log(estudiantes)
    })
  }

  addLista(estudiante: any) {
    this.serviceEstudiante.postEstudiante(estudiante).subscribe(est => {
      console.log(est)
    })
    this.listaEstudiantes.push({ ...estudiante });
  }
}

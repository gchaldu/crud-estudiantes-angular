import { Component } from '@angular/core';
import { ListEstudianteComponent } from '../../components/list-estudiante/list-estudiante.component';

@Component({
  selector: 'app-estudiante-page',
  standalone: true,
  imports: [ListEstudianteComponent],
  templateUrl: './estudiante-page.component.html',
  styleUrl: './estudiante-page.component.css'
})
export class EstudiantePageComponent {

}

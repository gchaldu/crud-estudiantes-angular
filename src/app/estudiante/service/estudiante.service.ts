import { Injectable } from '@angular/core';
import { Estudiante } from '../interface/estudiante.interface';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/estudiante';

  getEstudianteSuperBasic(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  getEstudianteBasic(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url).pipe(
      catchError(error => {
        console.error('Error al obtener los estudiantes:', error);
        return of([]);
      })
    );
  }
  getEstudiante(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url).pipe(

      map((estudiantes: Estudiante[]) => {

        return estudiantes.map(estudiante => ({
          ...estudiante,
          nombreCompleto: `${estudiante.nombre} ${estudiante.apellido}`
        }));
      }),
      // Maneja errores
      catchError(error => {
        console.error('Error al obtener los estudiantes:', error);
        //retorna un observable de tipo []
        return of([]);
      })
    );
  }

  getEstudianteById(id: string): Observable<Estudiante | null> {
    return this.http.get<Estudiante>(`${this.url}/${id}`)
      .pipe(
        catchError(err => of(null))
      )
  }

  postEstudiante(estudiante: Estudiante): Observable<Estudiante | null> {
    return this.http.post<Estudiante>(this.url, estudiante).pipe(
      catchError((error: any) => {
        console.log(error)
        return of(null);
      })
    )
  }

  deleteEstudiante(id: string): Observable<boolean> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        map(response => true),
        catchError(err => {
          return of(false)
        }));
  }

  updateEstudiante(id: string) {
    return this.getEstudianteById(id)
      .pipe(
        switchMap(est => {
          if (est) {
            return this.http.put(`${this.url}/${id}`, est)
          } else {
            return of(null)
          }
        }),
        catchError(error => of(null))
      )
  }
}

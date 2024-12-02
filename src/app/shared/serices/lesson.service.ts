import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = `http://localhost:8080/instructor/courses/lessons`;

  constructor(private http: HttpClient) {}


  addLesson(courseId: number, lesson: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add/${courseId}`, lesson);
  }

  updateLesson(id: number, lesson: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, lesson);
  }

  deleteLesson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  getLessonById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

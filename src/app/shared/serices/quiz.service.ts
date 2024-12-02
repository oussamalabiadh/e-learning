import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private HttpClient:HttpClient) { }
  baseUrl='http://localhost:8080/instructor'
  addQuiz(lessonId: number, formData: any): Observable<any>{
   return this.HttpClient.post(this.baseUrl+`/lessons/${lessonId}/quiz/add`,formData)
  }
  getQuizById(id: number): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseUrl}/getQuizById/${id}`);
  }
  updatequiz(id: number, quiz: any): Observable<any> {
    return this.HttpClient.put<any>(`${this.baseUrl}/updateQuiz/${id}`, quiz);
  }

  deletequiz(id: number): Observable<any> {
    return this.HttpClient.delete<any>(`${this.baseUrl}/deleteQuiz/${id}`);
  }
}

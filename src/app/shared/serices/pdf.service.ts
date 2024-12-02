import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private HttpClient:HttpClient) { }
  baseUrl='http://localhost:8080/instructor'
  addPdf(lessonId: number, formData: FormData): Observable<any>{
   return this.HttpClient.post(this.baseUrl+`/lessons/${lessonId}/pdfs/add`,formData)
  }
  updatePdf(id: number, Pdf: any): Observable<any> {
    return this.HttpClient.put<any>(`${this.baseUrl}/lessons/pdfs/update/${id}`, Pdf);
  }

  deletePdf(id: number): Observable<any> {
    return this.HttpClient.delete<any>(`${this.baseUrl}/lessons/pdfs/delete/${id}`);
  }

  getPdfById(id: number): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseUrl}/lessons/pdfs/${id}`);
  }
}

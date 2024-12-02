import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8080/instructor'; // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  addPublication(instructorId: number, publication: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('publication', new Blob([JSON.stringify(publication)], { type: 'application/json' }));
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/createPublication/${instructorId}`, formData);
  }
  getPublicationByInstructor(instructorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${instructorId}/publications`)

  }
  deletePublication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletePublication/${id}`)

  }
}


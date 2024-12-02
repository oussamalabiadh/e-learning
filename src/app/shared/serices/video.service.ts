import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = `http://localhost:8080/instructor`;

  constructor(private http: HttpClient) {}

  addVideo(lessonId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lessons/${lessonId}/videos/add`, formData);
}


  updateVideo(id: number, video: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/lessons/videos/update/${id}`, video);
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/lessons/videos/delete/${id}`);
  }

  getVideoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lessons/videos/${id}`);
  }
}

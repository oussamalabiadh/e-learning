import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = `http://localhost:8080/instructor`;

  constructor(private http: HttpClient) { }

  createRoom(instructor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`,instructor);
  }

  closeRoom(roomId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/close/${roomId}`, {});
  }

  requestToJoinRoom(user: any, roomId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join/${roomId}`, user);
  }

  handleJoinRequest(anyId: number, status: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/handle-request/${anyId}?status=${status}`, {});
  }

  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getUsersInRoom(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${roomId}/users`);
  }

  getRoomsByInstructor(instructorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${instructorId}/rooms`);
  }
}

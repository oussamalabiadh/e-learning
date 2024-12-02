import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
baseUrl="http://localhost:8080/"
  constructor(private _HttpClient:HttpClient) { }
  getInstructorById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`admin/users/getUserById/${id}`)
  }
}

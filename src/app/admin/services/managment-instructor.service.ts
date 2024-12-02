import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagmentInstructorService {

  baseUrl="http://localhost:8080/"
  constructor(private _HttpClient:HttpClient) { }
  getAllInstructor():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`admin/users/getUsersByRole/INSTRUCTOR`)
  }
  getInstructorById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`admin/users/getUserById/${id}`)
  }
  updateInstructor(id:any,instructor:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`admin/users/updateInstructor/${id}`,instructor)
  }
  deleteInstructor(id:any):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`admin/users/deleteUser/${id}`)
  }
  addInstructor(instructor:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`admin/instructor/createInstructor`,instructor)
  }
  getInstructorLoginCountByDay(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`admin/instructor/instructor-login-count`)
  }
  

}

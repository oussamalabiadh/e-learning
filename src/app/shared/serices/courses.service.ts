import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private HttpClient:HttpClient) { }
baseurl="http://localhost:8080/instructor"
  getCoursesByInstructorAndSubCategoryId(instructorId:any , subCategoryId:any):Observable<any>{
    return this.HttpClient.get(this.baseurl+`/${instructorId}/courses/${subCategoryId}`)
  }
  addCourse(subCategoryId: number, instructorId: number, course: any): Observable<any> {
    return this.HttpClient.post<any>(`${this.baseurl}/courses/${subCategoryId}/${instructorId}/add`, course);
  }

  updateCourse(id: number, updatedCourse: any): Observable<any> {
    return this.HttpClient.put<any>(`${this.baseurl}/courses/update/${id}`, updatedCourse);
  }

  deleteCourse(id: number): Observable<any> {
    return this.HttpClient.delete<any>(`${this.baseurl}/courses/delete/${id}`);
  }

  getCoursesBySubCategory(subCategoryId: number): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseurl}/courses/subCategory/${subCategoryId}`);
  }

  getCourseById(id: number): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseurl}/courses/${id}`);
  }
  getCoursesByInstructor(id: number): Observable<any> {
    return this.HttpClient.get<any>(`${this.baseurl}/${id}/courses`);
  }
}

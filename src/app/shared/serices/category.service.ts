import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  private baseUrl="http://localhost:8080/"
  aDdCategory(category :any):Observable<any>{
    return this._HttpClient.post(this.baseUrl+"admin/categories/add",category)
  }
  getAllCategory():Observable<any>{
    return this._HttpClient.get(this.baseUrl+"instructor/getAllCategories/all")
  }
  getCategoryById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`instructor/getCategoryById/${id}`)
  }
  deleteCategory(id:any):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`instructor/deleteCategory/${id}`)
  }
  updateCategory(id:any,updateCategory:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`instructor/updateCategory/${id}`,updateCategory)
  }
  adDSubCategory(categoryId:any,category :any):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`instructor/${categoryId}/subcategories/add`,category)
  }
  getAllSubCategory():Observable<any>{
    return this._HttpClient.get(this.baseUrl+"instructor/subcategories/all")
  }
  getSubCategoryById(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`instructor/subcategories/${id}`)
  }
  deleteSubCategory(id:any):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`instructor/subcategories/delete/${id}`)
  }
  updateSubCategory(id:any,updateCategory:any):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`instructor/subcategories/update/${id}`,updateCategory)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant/constant'
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  getAllDish() {
    let headers = this.getHttpHeader();
    return this.http.get(API.PRODUCT.END_POINT.PRODUCT, { headers }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.productList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }
  getCategory() {
    return this.http.get(API.PRODUCT.END_POINT.CATEGORY).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return data.data.categoryList
        }
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }


  addNewDish(formData: FormData) {
    return this.http.post(API.PRODUCT.END_POINT.PRODUCT, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.PRODUCT.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else if (data.meta.statusCode === API.PRODUCT.STATUS.FAIL)
          return false;
        else {
          return [];
        }
      }),
      catchError((err) => {
        throw new Error(err)
      })
    );
  }


  addNewCategory(name) {
    return this.http.post(API.PRODUCT.END_POINT.CATEGORY, { name: name }, { headers: this.getHttpHeader() })
  }





  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,
    });
  }
}

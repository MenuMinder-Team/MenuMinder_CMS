import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant/constant'
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrder() {
    let headers = this.getHttpHeader();
    return this.http.get(API.ORDER.END_POINT.ORDER, { headers }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.ORDER.STATUS.GET_PRODUCT_SUCCESS) {
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

  getAllOrderGroup() {
    let headers = this.getHttpHeader();
    return this.http.get(API.ORDER.END_POINT.ORDER_GROUP, { headers }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.ORDER.STATUS.GET_PRODUCT_SUCCESS) {
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


  addNewOrder(formData: FormData) {
    return this.http.post(API.ORDER.END_POINT.ORDER, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.ORDER.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else if (data.meta.statusCode === API.ORDER.STATUS.FAIL)
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



  checkOut(formData: FormData) {
    return this.http.post(API.ORDER.END_POINT.ORDER, formData, { headers: this.getHttpHeader() }).pipe(
      map((data: any) => {
        if (data.meta.statusCode === API.ORDER.STATUS.GET_PRODUCT_SUCCESS) {
          return true;
        }
        else if (data.meta.statusCode === API.ORDER.STATUS.FAIL)
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



  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("jwtToken"))}`,
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  base_url = 'http://127.0.0.1:8000/api/'

  constructor(private http:HttpClient) { }
  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  getAllFoods():Promise<any>{
    let url = this.base_url + 'food/get'
    return this.http.get(url).toPromise()
  }
}

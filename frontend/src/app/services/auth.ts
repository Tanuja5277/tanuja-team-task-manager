import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  API_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.API_URL}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

}
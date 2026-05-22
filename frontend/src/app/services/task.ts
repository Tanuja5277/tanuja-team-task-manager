import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Task {

  API_URL = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {

    return this.http.get(this.API_URL);

  }

  createTask(data: any) {

    return this.http.post(this.API_URL, data);

  }

  deleteTask(id: string) {

    return this.http.delete(`${this.API_URL}/${id}`);

  }

}
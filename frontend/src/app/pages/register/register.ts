import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  formData = {
    name: '',
    email: '',
    password: ''
  };

  // RAILWAY BACKEND URL

  apiUrl = 'https://tanuja-team-task-manager-production.up.railway.app';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    this.http.post<any>(
      `${this.apiUrl}/api/auth/register`,
      this.formData
    ).subscribe({

      next: (response) => {

        alert('Registration Successful');

        this.router.navigate(['/login']);
      },

      error: (error) => {

        console.log(error);

        alert(error.error.message || 'Registration Failed');
      }
    });
  }
}
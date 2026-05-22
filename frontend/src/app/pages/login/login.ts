import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  formData = {
    email: '',
    password: ''
  };

  // RAILWAY BACKEND URL

  apiUrl = 'https://tanuja-team-task-manager-production.up.railway.app';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.http.post<any>(
      `${this.apiUrl}/api/auth/login`,
      this.formData
    ).subscribe({

      next: (response) => {

        // STORE TOKEN

        localStorage.setItem(
          'token',
          response.token
        );

        // STORE USER

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        alert('Login Successful');

        // REDIRECT

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {

        console.log(error);

        alert(error.error.message || 'Login Failed');
      }
    });
  }
}
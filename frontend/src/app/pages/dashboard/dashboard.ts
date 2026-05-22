import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  showModal = false;

  tasks: any[] = [];

  formData = {
    title: '',
    description: '',
    priority: 'High',
    dueDate: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
  }

  // OPEN MODAL

  openModal() {
    this.showModal = true;
  }

  // CLOSE MODAL

  closeModal() {
    this.showModal = false;
  }

  // GET ALL TASKS

  getTasks() {

    this.http.get<any>('http://localhost:5000/api/tasks')
      .subscribe({

        next: (res) => {

          this.tasks = res.tasks;
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // CREATE TASK

  createTask() {

    this.http.post(
      'http://localhost:5000/api/tasks/create',
      this.formData
    ).subscribe({

      next: (response: any) => {

        alert('Task Created Successfully');

        this.formData = {
          title: '',
          description: '',
          priority: 'High',
          dueDate: ''
        };

        this.closeModal();

        this.getTasks();
      },

      error: (error) => {

        console.log(error);

        alert('Failed To Create Task');
      }
    });
  }

  // DELETE TASK

  deleteTask(id: string) {

    this.http.delete(
      `http://localhost:5000/api/tasks/${id}`
    ).subscribe({

      next: () => {

        alert('Task Deleted Successfully');

        this.getTasks();
      },

      error: (err) => {

        console.log(err);

        alert('Failed To Delete Task');
      }
    });
  }

  // COMPLETE TASK

  toggleComplete(id: string) {

    this.http.put(
      `http://localhost:5000/api/tasks/complete/${id}`,
      {}
    ).subscribe({

      next: () => {

        this.getTasks();
      },

      error: (err) => {

        console.log(err);

        alert('Failed To Update Task');
      }
    });
  }
}
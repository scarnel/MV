import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // login
  email = '';
  password = '';
  respuesta = '';
  nombre = '';
  rol = '';
  isLoggedIn = false;

  // crud
  users: any[] = [];
  name = '';
  userEmail = '';
  userPassword = '';
  role = '';
  selectedId = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe((data: any) => {
      this.respuesta = data.message;
      this.nombre = data.user.name;
      this.rol = data.user.role;
      this.isLoggedIn = true;
      this.loadUsers();
    }, () => {
      this.respuesta = 'Credenciales incorrectas';
    });
  }

  logout() {
    this.isLoggedIn = false;
  }

  loadUsers() {
    this.api.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  createUser() {
    this.api.createUser({
      name: this.name,
      email: this.userEmail,
      password: this.userPassword,
      role: this.role
    }).subscribe(() => {
      this.clearForm();
      this.loadUsers();
    });
  }

  editUser(user: any) {
    this.selectedId = user._id;
    this.name = user.name;
    this.userEmail = user.email;
    this.userPassword = user.password;
    this.role = user.role;
  }

  updateUser() {
    this.api.updateUser(this.selectedId, {
      name: this.name,
      email: this.userEmail,
      password: this.userPassword,
      role: this.role
    }).subscribe(() => {
      this.clearForm();
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    this.api.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  clearForm() {
    this.name = '';
    this.userEmail = '';
    this.userPassword = '';
    this.role = '';
    this.selectedId = '';
  }
}
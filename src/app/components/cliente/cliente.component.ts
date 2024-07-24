import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente-service.service';
import { Cliente } from '../../models/Cliente';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class Clientes implements OnInit {
  clients: Cliente[] = [];
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private api: ClienteService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken();
    if (this.isLoggedIn) {
      this.getClients();
    }
  }

  getClients() {
    this.api.getClients().subscribe(
      data => {
        this.clients = data;
        this.cd.detectChanges();
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const request = {
        username: email,
        password: password
      };
  
      this.authService.login(request).subscribe(
        response => {
          console.log('Response from login:', response); // Imprimir respuesta
          this.authService.saveToken(response.jwt);
          console.log('Token:', response.jwt); // Imprimir token
          this.isLoggedIn = true;
          this.getClients();
        },
        error => {
          this.errorMessage = 'Login failed';
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}

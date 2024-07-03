import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClienteService} from '../../service/cliente-service.service';
import { Cliente } from '../../model/Cliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'] // corregido: styleUrl => styleUrls
})
export class Clientes implements OnInit {
  clients: Cliente[] = [];
  cli?: Cliente;
  name: string = '';
  direction: string = '';
  id: string = '';

  constructor(private api: ClienteService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clients = [];
    this.api.getClients().subscribe(data => {
      this.clients = data;
      this.cd.detectChanges(); // Forzar detección de cambios
    });
  }

  createClient() {
    if (this.id != '' && this.direction != '' && this.name != '') {
      const data = {
        cedula: this.id,
        direccion: this.direction,
        nombre: this.name
      }
      this.api.createClient(data).subscribe({
        next: (res) => {
          console.log(res);
          this.getClients(); // Actualizar la lista de clientes
        },
        error: (e) => console.error(e)
      });
      this.id = '';
      this.direction = '';
      this.name = '';
    } else {
      alert("Todos los campos son obligatorios")
    }
  }

  deleteClient(cedula: any) {
    this.api.deleteClient(cedula).subscribe({
      next: (res) => {
        console.log(res);
        this.getClients(); // Actualizar la lista de clientes
      },
      error: (e) => console.error(e)
    });
  }

  updateClient() {
    const data = {
      cedula: this.id,
      direccion: this.direction,
      nombre: this.name
    }
    this.api.updateClient(data).subscribe({
      next: (res) => {
        console.log(res);
        this.getClients(); // Actualizar la lista de clientes
      },
      error: (e) => console.error(e)
    });
    this.id = '';
    this.direction = '';
    this.name = '';
  }

  getValues(c: any, d: any, n: any) {
    this.id = c;
    this.direction = d;
    this.name = n;
  }
  
}


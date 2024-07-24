import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClienteService } from '../../service/cliente-service.service';
import { Cliente } from '../../model/Cliente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

// export class Clientes implements OnInit {
//   clients: Cliente[] = [
//     { id: "1", nombre: 'Erika', email: 'erivilla@gmail.com' },
//     { id: "2", nombre: 'Jackson', email: 'danharman@gmail.com' }
//   ];

//   constructor(private api: ClienteService, private cd: ChangeDetectorRef) { }

//   ngOnInit(): void {
//     // Comment this out for static testing
//     // this.getClients();
//   }
// }
export class Clientes implements OnInit {
  
  clients: Cliente[] = [];

  constructor(private api: ClienteService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    console.log('Fetching clients...'); // Log antes de la solicitud
    this.api.getClients().subscribe(
      data => {
        console.log('Clients recibidos:', data); // Log de datos recibidos
        this.clients = data;
        this.cd.detectChanges();
      },
      error => {
        console.error('Error fetching clients:', error); // Log de errores
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<Cliente[]>('http://localhost:8080/demojakarta/rs/clientes');
  }

  createClient(data: any) {
    return this.http.post('http://localhost:8080/demojakarta/rs/clientes', data);
  }

  deleteClient(id: any) {
    return this.http.delete(`http://localhost:8080/demojakarta/rs/clientes?id=${id}`);
  }

  updateClient(data: any) {
    return this.http.put('http://localhost:8080/demojakarta/rs/clientes', data);
  } 
  }



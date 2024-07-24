import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/proyectobackend/bl-sv';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Cliente[]> {
    console.log('Requesting clients from', `${this.baseUrl}/users`); // Log de solicitud
    return this.http.get<Cliente[]>(`${this.baseUrl}/users`);
  }
}

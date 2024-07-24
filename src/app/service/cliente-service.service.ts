import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/proyectobackend/bl-sv/users/info';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getClients(): Observable<Cliente[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Cliente[]>(this.apiUrl, { headers });
  }
}

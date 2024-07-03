import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Clientes } from './components/cliente/cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Clientes],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api';
}

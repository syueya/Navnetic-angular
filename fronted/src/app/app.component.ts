import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullComponent } from './layout/full/full.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FullComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

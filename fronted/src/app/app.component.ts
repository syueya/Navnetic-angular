import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingModule } from '@common/modules/loading/loading.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoadingModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

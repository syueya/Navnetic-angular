import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../common/material.module';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class AppErrorComponent {}

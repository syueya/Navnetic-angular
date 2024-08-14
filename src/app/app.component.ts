import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { MaterialModule } from '@common/material/material.module';

import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';
import { UrlItem,Category } from '@common/interfaces/dataJson';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FullComponent,
    MaterialModule,

    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  data: Category[] = [];


  private destroy$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.httpClient.get<Category[]>(`/api/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
  }
}

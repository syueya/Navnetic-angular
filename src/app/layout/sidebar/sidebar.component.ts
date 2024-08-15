import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@common/material/material.module';


import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil, Subject } from 'rxjs';
import { Category } from '@common/interfaces/dataJson';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  data: Category[] = [];
  private destroy$ = new Subject<void>();
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.httpClient.get<Category[]>(`/read`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.data = res;
      });
  }

}

import { Routes } from '@angular/router';

import { PagesFullComponent } from './pages/pages-full/pages-full.component';
import { AppErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesFullComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
      }
    ]
  },
  /* 错误 */
  {
    path: 'error',
    component: AppErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

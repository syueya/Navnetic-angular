import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import localeZh from '@angular/common/locales/zh';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
// perfect scrollbar
//Import all material modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { LoadingModule } from '@common/modules/loading/loading.module';
import { defaultInterceptor } from '@common/net';
import { CmProviders } from '@common/providers';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { routes } from './app.routes';
import { CommonUseModule } from './common/commonUse.module';
import { MaterialModule } from './common/material.module';
registerLocaleData(localeZh);


import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    CmProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors([defaultInterceptor])),
    provideAnimationsAsync(),
    provideClientHydration(),
    importProvidersFrom(
      LoadingModule.forRoot(),
      CommonUseModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      NgScrollbarModule,
    )
  ]
};

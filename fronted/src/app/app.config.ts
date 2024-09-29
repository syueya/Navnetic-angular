import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import localeZh from '@angular/common/locales/zh';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { LoadingModule } from '@common/modules/loading/loading.module';
import { defaultInterceptor } from '@common/net';
import { CmProviders } from '@common/providers';
import { routes } from './app.routes';
import { CommonUseModule } from './common/commonUse.module';
import { MaterialModule } from './common/material.module';

registerLocaleData(localeZh);

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
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([defaultInterceptor])),
    provideAnimationsAsync(),

    importProvidersFrom(
      LoadingModule.forRoot(),
      CommonUseModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

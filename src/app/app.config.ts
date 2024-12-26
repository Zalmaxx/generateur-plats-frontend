import {ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {ApplicationInsights} from "@microsoft/applicationinsights-web";
import {environment} from "../environments/environment";

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => () => {
      console.log('Application Insights Key:', environment.appInsightKey.slice(0, 5) + '...');
      const appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: environment.appInsightKey, // Remplacez par votre clé
          enableAutoRouteTracking: true, // Active le suivi des changements de route
          disableAjaxTracking: false, // Active le suivi des requêtes AJAX
        },
      });

      appInsights.loadAppInsights();

      // Suivi des vues de pages
      appInsights.trackPageView({
        name: window.location.pathname
      });

      return () => {}; // Placeholder pour APP_INITIALIZER
    },
    multi: true,
  },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(icons),
    provideNzI18n(fr_FR),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};

import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core'
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app'
import {
  FirebaseStorage,
  getStorage,
  provideStorage,
} from '@angular/fire/storage'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'

import { HttpClientModule } from '@angular/common/http'
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { environment } from '@src/environments/environment'
import { routes } from './app.routes'

const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
  },
  display: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideAnimations(),
    // provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom([
      provideFirebaseApp(
        (): FirebaseApp => initializeApp(environment.firebaseConfig)
      ),
      provideStorage((): FirebaseStorage => getStorage()),
    ]),
    // provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    // provideEffects(),
    // provideState('user', userReducers),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
};

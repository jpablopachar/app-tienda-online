export enum UserTypes {
  INIT = '[User] Init: Inicio',
  INIT_AUTHORIZED = '[User] Init: Autorizado',
  INIT_UNAUTHORIZED = '[User] Init: No autorizado',
  INIT_ERROR = '[User] Init: Error',

  SIGIN_IN_EMAIL = '[User] Login: Inicio',
  SIGIN_IN_EMAIL_SUCCESS = '[User] Login: Éxito',
  SIGIN_IN_EMAIL_ERROR = '[User] Login: Error',

  SIGN_UP_EMAIL = '[User] Register: Inicio',
  SIGN_UP_EMAIL_SUCCESS = '[User] Register: Éxito',
  SIGN_UP_EMAIL_ERROR = '[User] Register: Error',

  SIGN_OUT_EMAIL = '[User] Logout: Inicio',
  SIGIN_OUT_EMAIL_SUCCESS = '[User] Logout: Éxito',
  SIGIN_OUT_EMAIL_ERROR = '[User] Logout: Error',
}
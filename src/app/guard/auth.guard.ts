// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };



import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { LoggerService } from '../services/logger.service';

export const AuthGuard = (next: ActivatedRouteSnapshot) => {
  let value = inject(LoggerService).isLoggedIn();

  return value ? true : createUrlTreeFromSnapshot(next, ['/', 'login']);
};




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  isLogged: boolean = false
  
  
  isLoggedIn() {
    
    return this.isLogged
  }
}

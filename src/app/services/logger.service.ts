import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  isLogged: boolean = false
  
  
  isLoggedIn() {
    // console.log(this.isLogged);
    
    return this.isLogged
  }
}

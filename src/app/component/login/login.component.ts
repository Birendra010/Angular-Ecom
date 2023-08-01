import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators,FormGroup, AbstractControl, } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
      
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.loginForm.get(name);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  }  
}

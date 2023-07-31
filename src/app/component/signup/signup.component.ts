import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
      
    });
  }

  getControl(name: any): AbstractControl | null {
    return this.signupForm.get(name);
  }


  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const formData = this.signupForm.value;
    // 'YOUR_BACKEND_API_URL' 
    const apiUrl = '';

    this.http.post(apiUrl, formData).subscribe(
      (response) => {
        console.log('Signup successful:', response);
      },
      (error) => {
        console.error('Signup failed:', error);
      }
    );
  }
}

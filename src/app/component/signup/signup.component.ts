import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
 integerRegex=/^\d+$/
  constructor(private fb: FormBuilder, private http: HttpClient ,private userService:UserService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(32)]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern(this.integerRegex)]),
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
    // const apiUrl = 'signUp';

    this.userService.Signup(formData).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        
      },
      (error) => {
        console.error('Signup failed:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  // form: FormGroup;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  get email() {
    return this.form.get('email');
  }

  forgotPassword() {
    console.log(this.form.value);

    this.userService.forgotPassword(this.email?.value).subscribe(
      (data) => {
        this.toastr.success('Reset password link send to email sucessfully.');
      },
      (err) => {
        this.toastr.error(err.error.msg);
      }
    );
  }
}

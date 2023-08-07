import { Component } from '@angular/core';
import { PasswordValidators } from './password.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.form = fb.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: PasswordValidators.passwordsShouldMatch }
    );
  }

  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  updatePassword() {
    let token = this.router.snapshot.paramMap.get('emailToken');
    if (token) {
      this.userService.updatePassword(this.form.value, token).subscribe(
        (data) => {
          this.toastr.success(' Password updated  sucessfully.');
          setTimeout(() => {
            this.route.navigate(['/']);
          }, 2000);
        },
        (err) => {
          this.toastr.error(err.error.msg);
        }
      );
    }
  }
}

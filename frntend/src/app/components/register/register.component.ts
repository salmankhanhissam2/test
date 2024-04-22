import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../PasswordValidators/passwordMatchvalidatores';
import { AuthService } from '../../services/auth.service';
import { users } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[z-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
  { Validators: passwordMatchValidator });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    this.authService.registerUser(postData as users).subscribe(
      (response: any) => {
        console.log('Response:', response);
        // Handle the response or trigger any other action upon success
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle the error or show an error message to the user
      }
    );
  }
}

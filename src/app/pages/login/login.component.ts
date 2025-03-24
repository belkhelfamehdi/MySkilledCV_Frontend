import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapGoogle, bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  viewProviders: [provideIcons({ bootstrapGoogle, bootstrapGithub, bootstrapEye, bootstrapEyeSlash })]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Please check your email and password.';
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isLoggedIn = false;
  private authSubscription!: Subscription;

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}

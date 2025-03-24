import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  viewProviders: [provideIcons({ bootstrapGoogle, bootstrapGithub })]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        },
        error: (err) => alert(err.error || 'Erreur lors de l’inscription')
      });
    }
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

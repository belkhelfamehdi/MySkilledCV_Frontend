import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  viewProviders: [provideIcons({ bootstrapGoogle, bootstrapGithub })]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => { this.router.navigate(['/']); },
        error: (err) => alert(err.error || 'Erreur lors de l’inscription')
      });
    }
  }
}

import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIcon, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  viewProviders: [provideIcons({ bootstrapGoogle, bootstrapGithub })]
})
export class LoginComponent {

}

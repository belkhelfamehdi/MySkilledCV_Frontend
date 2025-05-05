import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DemoComponent } from './pages/demo/demo.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guard/auth.guard';
import { notAuthGuard } from './guard/not-auth.guard';
import { OAuth2RedirectComponent } from './components/oauth2-redirect/oauth2-redirect.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'demo', component: DemoComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [notAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [notAuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'oauth2-redirect', component: OAuth2RedirectComponent}
];

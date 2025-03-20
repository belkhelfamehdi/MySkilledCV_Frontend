import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FeaturesComponent } from './pages/features/features.component';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'demo', component: DemoComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

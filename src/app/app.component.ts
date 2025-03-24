import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'job_platform';

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    console.log(console.log(this.authService.hello()));
    }
}

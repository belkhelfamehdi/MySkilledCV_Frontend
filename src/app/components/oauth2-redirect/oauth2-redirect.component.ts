import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-oauth2-redirect',
  templateUrl: './oauth2-redirect.component.html',
})
export class OAuth2RedirectComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const accessToken = params['accessToken'];

      if (accessToken) {
        this.authService.saveToken(accessToken);
        this.router.navigate(['/']);
      } else {
        console.error('Authentication failed: Tokens not found.');
        this.router.navigate(['/login']);
      }
    });
  }
}

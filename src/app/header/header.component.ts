import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuhtenticated: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuhtenticated = isAuthenticated;
      const token = this.oidcSecurityService.getAccessToken();
    console.log(token);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
    
  }

  logout() {
    this.oidcSecurityService.logoffAndRevokeTokens();
  }
}

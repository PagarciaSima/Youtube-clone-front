import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-u0zrcpwkth27whmj.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: '2TYmn040V8FzVl5PaRi8EMEjuGuBFvj0',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}

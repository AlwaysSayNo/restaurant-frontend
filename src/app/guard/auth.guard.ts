import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!environment.production) {
      return true;
    }

    const user = this.authenticationService.userValue;

    if (user) {
      if (route.data['roles'] && route.data['roles'].indexOf(user.authorities[0]) === -1) {
        void this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    void this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

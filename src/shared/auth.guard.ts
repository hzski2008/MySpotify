import { AuthService } from "shared/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) {}

  canActivate (): boolean {
    if (this.auth.authenticated) {
      return true;
    }
    this.router.navigate(["./login"]);
    return false;
  }
}

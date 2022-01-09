import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router
  ) { }

  logout (): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.route.navigate(['login']);
  }

}

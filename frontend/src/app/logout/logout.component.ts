import {Component, OnInit} from '@angular/core';
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private route: Router
  ) {
  }

  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.route.navigate(['login']);
  }

}

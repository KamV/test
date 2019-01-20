import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(
      private router: Router,
      private authService: AuthService) { }

    ngOnInit() { }

    logOut() {
      this.router.navigate(['signin']);
      this.authService.logOut();
    }
}

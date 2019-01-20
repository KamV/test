import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import '../public/scss/styles.scss';

@Component({
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	showNav = false;
	constructor(private router: Router) {}

	ngOnInit() {
		this.router.events
		.filter(event => event instanceof NavigationStart)
		.subscribe((event: NavigationStart) => {
        if (event.url !== '/signin' && event.url !== '/signup' && event.url !== '/') {
					this.showNav = true;
				} else {
					this.showNav = false;
				}
    });
  }
}

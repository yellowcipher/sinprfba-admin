/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService } from '@nebular/theme';
import { AuthService } from './services/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'ngx-app',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
	constructor(
		private analytics: AnalyticsService,
		private menuService: NbMenuService,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.analytics.trackPageViews();

		this.menuService
			.onItemClick()
			.pipe(filter(({ tag }) => tag === 'userMenuTag'), map(({ item: { title } }) => title))
			.subscribe((title) => {
				switch (title) {
					case 'Sair':
						this.authService.signOut();
						break;
					default:
						break;
				}
			});
	}
}

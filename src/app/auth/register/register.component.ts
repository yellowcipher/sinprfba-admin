import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getDeepFromObject } from '@nebular/auth';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth';

@Component({
	selector: 'ngx-app-register',
	styleUrls: [ './register.component.scss' ],
	templateUrl: './register.component.html',
})
export class RegisterComponent {
	redirectDelay: number = 0;
	showMessages: any = {};

	submitted = false;
	errors: string[] = [];
	messages: string[] = [];
	user: any = {};
	socialLinks: NbAuthSocialLink[] = [];
	validation: any = {};

	constructor(protected auth: AuthService, @Inject(NB_AUTH_OPTIONS) protected config = {}, protected router: Router) {
		this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
		this.showMessages = this.getConfigValue('forms.register.showMessages');
		this.socialLinks = this.getConfigValue('forms.register.socialLinks');

		this.validation = this.getConfigValue('forms.validation');
	}

	async register() {
		this.errors = this.messages = [];
		this.submitted = true;

		try {
			await this.auth.register(this.user.email, this.user.password);
			this.submitted = false;
			this.messages = [];

			this.redirectToDashboard();
		} catch (err) {
			this.submitted = false;
			this.errors = [ err ];
		}
	}

	socialLogin(name) {
		if (name === 'google') {
			this.googleLogin();
		} else if (name === 'facebook') {
			this.facebookLogin();
		} else {
			console.warn('No login for ' + name);
		}
	}

	async googleLogin() {
		try {
			await this.auth.googleLogin();
			this.redirectToDashboard();
		} catch (err) {
			this.errors = [ err ];
		}
	}

	async facebookLogin() {
		try {
			await this.auth.facebookLogin();
			this.redirectToDashboard();
		} catch (err) {
			this.errors = [ err ];
		}
	}

	redirectToDashboard() {
		setTimeout(() => {
			this.router.navigate([ '/pages/dashboard' ]);
		}, this.redirectDelay);
	}

	getConfigValue(key: string): any {
		return getDeepFromObject(this.config, key, null);
	}
}

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getDeepFromObject } from '@nebular/auth';
import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '@nebular/auth';

@Component({
	selector: 'ngx-app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	redirectDelay: number = 0;
	showMessages: any = {};
	strategy: string = '';

	errors: string[] = [];
	messages: string[] = [];
	user: any = {};
	submitted: boolean = false;
	socialLinks: NbAuthSocialLink[] = [];
	rememberMe = false;

	constructor(protected auth: AuthService, @Inject(NB_AUTH_OPTIONS) protected config = {}, protected router: Router) {
		this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
		this.showMessages = this.getConfigValue('forms.login.showMessages');
		this.strategy = this.getConfigValue('forms.login.strategy');
		this.socialLinks = this.getConfigValue('forms.login.socialLinks');
		this.rememberMe = this.getConfigValue('forms.login.rememberMe');
	}

	async emailLogin() {
		this.errors = this.messages = [];
		this.submitted = true;

		try {
			await this.auth.signInWithEmail(this.user.email, this.user.password);
			this.submitted = false;
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

import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

const socialLinks = [
	{
		url: 'https://github.com/akveo/nebular',
		target: '_blank',
		icon: 'github',
	},
	{
		url: 'https://www.facebook.com/akveo/',
		target: '_blank',
		icon: 'facebook',
	},
	{
		url: 'https://twitter.com/akveo_inc',
		target: '_blank',
		icon: 'twitter',
	},
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		NbAlertModule,
		NbInputModule,
		NbButtonModule,
		NbCheckboxModule,
		NgxAuthRoutingModule,

		NbAuthModule.forRoot({
			strategies: [
				NbDummyAuthStrategy.setup({
					name: 'email',
					delay: 3000,
				}),
			],
			forms: {
				login: {
					socialLinks: socialLinks,
				},
				register: {
					socialLinks: socialLinks,
				},
				validation: {
					password: {
						required: true,
						minLength: 8,
						maxLength: 42,
					},
					email: {
						required: true,
					},
				},
			},
		}),
	],
	declarations: [
		// ... here goes our new components
		LoginComponent,
		RegisterComponent,
		RequestPasswordComponent,
		ResetPasswordComponent,
	],
})
export class NgxAuthModule {}

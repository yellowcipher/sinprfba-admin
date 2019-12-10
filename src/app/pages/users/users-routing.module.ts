import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersShowComponent } from './users-show/users-show.component';
import { NewUserComponent } from './new-user/new-user.component';

export const routedComponents = [ UsersShowComponent, UsersComponent ];

const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		pathMatch: 'full',
	},
	{
		path: ':id',
		component: UsersShowComponent,
	},
	{
		path: 'user/new',
		component: NewUserComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class UsersRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersShowComponent } from './users-show/users-show.component';

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
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class UsersRoutingModule {}

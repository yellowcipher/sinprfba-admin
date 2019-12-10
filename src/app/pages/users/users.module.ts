import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, UsersRoutingModule } from './users-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { NewUserComponent } from './new-user/new-user.component';

const MODULES = [ CommonModule, UsersRoutingModule, Ng2SmartTableModule, NbCardModule ];

@NgModule({
	declarations: [ ...routedComponents, NewUserComponent ],
	imports: [ ...MODULES ],
})
export class UsersModule {}

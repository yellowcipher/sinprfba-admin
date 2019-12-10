import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, UsersRoutingModule } from './users-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

const MODULES = [
	CommonModule,
	UsersRoutingModule,
	Ng2SmartTableModule,
	NbCardModule,
	FormsModule,
	ReactiveFormsModule,
	TextMaskModule,
	NbSelectModule,
];

@NgModule({
	declarations: [ ...routedComponents, NewUserComponent ],
	imports: [ ...MODULES ],
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, UsersRoutingModule } from './users-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';

const MODULES = [ CommonModule, UsersRoutingModule, Ng2SmartTableModule, NbCardModule ];

@NgModule({
	declarations: [ ...routedComponents ],
	imports: [ ...MODULES ],
})
export class UsersModule {}

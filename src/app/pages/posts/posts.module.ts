import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';  



@NgModule({
	declarations: [ PostsComponent ],
	imports: [ CommonModule, PostsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PostsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsComponent } from './news/news.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { DiretoriasComponent } from './diretorias/diretorias.component';
import { NbDatepickerModule, NbCardModule } from '@nebular/theme';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	declarations: [ PostsComponent, NewsComponent, CarrouselComponent, DiretoriasComponent ],
	imports: [
		CommonModule,
		PostsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		RichTextEditorAllModule,
		NbDatepickerModule,
		NbCardModule,
	],
})
export class PostsModule {}

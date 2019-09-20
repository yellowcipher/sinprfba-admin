import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { NewsComponent } from './news/news.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { DiretoriasComponent } from './diretorias/diretorias.component';
import { NewNewsComponent } from './news/new-news/new-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';

export const routedComponents = [
	PostsComponent,
	NewsComponent,
	CarrouselComponent,
	DiretoriasComponent,
	NewNewsComponent,
	EditNewsComponent,
];

const routes: Routes = [
	{
		path: '',
		component: PostsComponent,
		children: [
			{
				path: 'news',
				component: NewsComponent,
			},
			{
				path: 'news/new',
				component: NewNewsComponent,
			},
			{
				path: 'news/edit/:id',
				component: EditNewsComponent,
			},
			{
				path: 'carrousel',
				component: CarrouselComponent,
			},
			{
				path: 'diretorias',
				component: DiretoriasComponent,
			},
		],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class PostsRoutingModule {}

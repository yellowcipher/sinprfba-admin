import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { NewsComponent } from './news/news.component';
import { CarrouselComponent } from './carrousel/carrousel.component';

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
				path: 'carrousel',
				component: CarrouselComponent,
			},
		],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class PostsRoutingModule {}

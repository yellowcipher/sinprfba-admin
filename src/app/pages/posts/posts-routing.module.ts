import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { NewsComponent } from './news/news.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NewNewsComponent } from './news/new-news/new-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { BoardComponent } from './board/board.component';
import { NewBoardComponent } from './board/new-board/new-board.component';
import { EditBoardComponent } from './board/edit-board/edit-board.component';
import { NewCarrouselComponent } from './carrousel/new-board/new-carrousel.component';
import { EditCarrouselComponent } from './carrousel/edit-carrousel/edit-carrousel.component';

export const routedComponents = [
	PostsComponent,
	NewsComponent,
	CarrouselComponent,
	NewNewsComponent,
	EditNewsComponent,
	BoardComponent,
	EditBoardComponent,
	NewBoardComponent,
	NewCarrouselComponent,
	EditCarrouselComponent,
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
				path: 'carrousel/new',
				component: NewCarrouselComponent,
			},
			{
				path: 'carrousel/edit/:id',
				component: EditCarrouselComponent,
			},
			{
				path: 'board',
				component: BoardComponent,
			},
			{
				path: 'board/new',
				component: NewBoardComponent,
			},
			{
				path: 'board/edit/:id',
				component: EditBoardComponent,
			},
		],
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class PostsRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Carrousel, CarrouselService } from './../../../services/carrousel.service';

@Component({
	selector: 'ngx-carrousel',
	templateUrl: './carrousel.component.html',
	styleUrls: [ './carrousel.component.scss' ],
})
export class CarrouselComponent implements OnInit {
	posts: any[];
	searchedPosts: any[];
	prevKeys: number[] = [];
	nextKey: number;
	titleQuery$: Subject<string>;
	textField: string;

	constructor(public postsService: CarrouselService) {
		// subscribe to changes - input dynamic search
		this.titleQuery$ = new Subject<string>();
		const queryObservable = this.postsService.dynamicSearch(this.titleQuery$, 'title', 5);
		queryObservable.subscribe((queriedItems) => {
			this.searchedPosts = queriedItems;
		});
	}

	ngOnInit() {}

	public async createPost(formData) {
		const post: Carrousel = {
			title: formData.titleInput,

			resumo: formData.resumeInput,
			imgPrincipal: formData.imageInput,
		};
		await this.postsService.createPost(post);
	}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	fileToUpload: File;

	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	constructor(public postsService: CarrouselService) {
		// subscribe to changes - input dynamic search
		this.titleQuery$ = new Subject<string>();
		const queryObservable = this.postsService.dynamicSearch(this.titleQuery$, 'title', 5);
		queryObservable.subscribe((queriedItems) => {
			this.searchedPosts = queriedItems;
		});
	}

	ngOnInit() {}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	public async createPost(formData) {
		const post: Carrousel = {
			title: formData.titleInput,
			excerpt: formData.resumeInput,
			mainImage: this.fileToUpload,
		};
		await this.postsService.createPost(post);
	}
}

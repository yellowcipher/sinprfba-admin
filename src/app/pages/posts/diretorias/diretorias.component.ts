import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Diretoria, DiretoriasService } from './../../../services/diretorias.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'ngx-diretorias',
	templateUrl: './diretorias.component.html',
	styleUrls: [ './diretorias.component.scss' ],
})
export class DiretoriasComponent implements OnInit {
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;
	titleQuery$: any;
	searchedPosts: any[];
	diretoriasService: any;

	constructor(public postsService: DiretoriasService) {
		// subscribe to changes - input dynamic search
		this.titleQuery$ = new Subject<string>();
		const queryObservable = this.postsService.dynamicSearch(this.titleQuery$, 'title', 5);
		queryObservable.subscribe((queriedItems) => {
			this.searchedPosts = queriedItems;
		});
	}

	fileToUpload: File;

	ngOnInit() {}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	public async createPost(formData) {
		const post: Diretoria = {
			title: formData.titleInput,
			excerpt: formData.textInput,
			mainImage: this.fileToUpload,
		};
		await this.postsService.createPost(post);
	}
}

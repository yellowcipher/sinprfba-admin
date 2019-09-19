import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Post, PostsService } from './../../../services/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'ngx-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ],
})
export class NewsComponent implements OnInit {
	posts: any[];
	searchedPosts: any[];
	prevKeys: string[] = [];
	nextKey: string;
	titleQuery$: Subject<string>;
	textField: string;

	fileToUpload: File;
	slidesToUpload: [File];

	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	@ViewChild('labelSlides', { static: true })
	labelSlides: ElementRef;

	constructor(public postsService: PostsService) {
		// subscribe to changes - input dynamic search
		this.titleQuery$ = new Subject<string>();
		const queryObservable = this.postsService.dynamicSearch(this.titleQuery$, 'title', 5);
		queryObservable.subscribe((queriedItems) => {
			this.searchedPosts = queriedItems;
		});
	}

	ngOnInit() {
		this.postsService.getFirstPost().then((firstPost) => {
			this.getPosts(firstPost[0].createdAt);
		});
	}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	onSlidesChange(slides: [File]) {
		this.labelSlides.nativeElement.innerText = slides.length + ' files chosen';
		this.slidesToUpload = slides;
	}

	public async createPost(formData) {
		const post: Post = {
			title: formData.titleInput,
			excerpt: formData.resumeInput,
			font: formData.sourceInput,
			content: formData.textInput,
			mainImage: this.fileToUpload,
			slides: this.slidesToUpload,
		};
		await this.postsService.createPost(post);
	}

	previousPage() {
		this.getPosts(this.prevKeys.pop());
	}

	nextPage() {
		this.prevKeys.push(this.posts[0].createdAt);
		this.getPosts(this.nextKey);
	}

	getPosts(startAt) {
		this.postsService.listPosts(6, startAt).then((list) => {
			if (list.length === 6) {
				this.nextKey = list.pop().uid;
			} else {
				this.nextKey = null;
			}
			this.posts = list;
		});
	}
}

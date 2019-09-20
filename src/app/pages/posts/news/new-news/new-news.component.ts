import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from '../../../../models/post';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ngx-new-news',
	templateUrl: './new-news.component.html',
	styleUrls: [ './new-news.component.scss' ],
})
export class NewNewsComponent {
	fileToUpload: File;
	slidesToUpload: [File];

	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	@ViewChild('labelSlides', { static: true })
	labelSlides: ElementRef;

	constructor(public postsService: PostsService, private router: Router, private route: ActivatedRoute) {}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	onSlidesChange(slides: [File]) {
		this.labelSlides.nativeElement.innerText = slides.length + ' files chosen';
		this.slidesToUpload = slides;
	}

	async createPost(formData) {
		const post: Post = {
			title: formData.titleInput,
			excerpt: formData.resumeInput,
			font: formData.sourceInput,
			content: formData.textInput,
			mainImage: this.fileToUpload,
			slides: this.slidesToUpload,
		};
		await this.postsService.add(post);
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}
}

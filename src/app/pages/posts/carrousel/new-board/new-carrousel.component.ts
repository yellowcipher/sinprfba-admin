import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostsService } from '../../../../services/carrousel.service';
import { Carrousel } from '../../../../models/post';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ngx-new-carrousel',
	templateUrl: './new-carrousel.component.html',
	styleUrls: [ './new-carrousel.component.scss' ],
})
export class NewCarrouselComponent {
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
		const post: Carrousel = {
			title: formData.titleInput,
			excerpt: formData.textInput,
			mainImage: this.fileToUpload,
		};
		await this.postsService.add(post);
		this.router.navigate([ '../' ], { relativeTo: this.route });
	}
}

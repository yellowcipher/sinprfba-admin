import { Post } from './../../../../models/post';
import { PostsService } from './../../../../services/posts.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'ngx-edit-news',
	templateUrl: './edit-news.component.html',
	styleUrls: [ './edit-news.component.scss' ],
})
export class EditNewsComponent implements OnInit {
	post$: Observable<Post>;
	isEditingImage: boolean = false;
	fileToUpload: File;

	@ViewChild('imageInput', { static: false })
	imageInput: ElementRef;

	constructor(
		private postsService: PostsService,
		private router: Router,
		private route: ActivatedRoute,
		private changeDetectorRef: ChangeDetectorRef,
	) {}

	ngOnInit() {
		const id = this.router.url.split('/').pop();
		this.post$ = this.postsService.records.pipe(
			filter((records) => records.length > 0),
			map((records) => records.find((record) => record.uid === id)),
		);
	}

	startEditing() {
		this.isEditingImage = true;
		this.changeDetectorRef.detectChanges();
	}

	cancelEditing() {
		this.isEditingImage = false;
		this.fileToUpload = null;
		this.changeDetectorRef.detectChanges();
	}

	onFileChange(files: FileList) {
		this.imageInput.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	async update(post: Post) {
		post.mainImage = this.fileToUpload;
		await this.postsService.update(post);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}

import { Post } from './../../../../models/post';
import { PostsService } from './../../../../services/posts.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'ngx-edit-news',
	templateUrl: './edit-news.component.html',
	styleUrls: [ './edit-news.component.scss' ],
})
export class EditNewsComponent implements OnInit {
	post$: Observable<Post>;
	isEditingImage: boolean = false;
	fileToUpload: File;
	startDate: FormControl;
	endDate: FormControl;

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
			tap((post) => {
				if (post.startDate != null) {
					this.startDate = new FormControl(
						post.startDate instanceof Date ? post.startDate : (post.startDate as any).toDate(),
					);
				} else {
					this.startDate = new FormControl();
				}

				if (post.endDate != null) {
					this.endDate = new FormControl(
						post.endDate instanceof Date ? post.endDate : (post.endDate as any).toDate(),
					);
				} else {
					this.endDate = new FormControl();
				}
			}),
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
		post.startDate = this.startDate.value;
		post.endDate = this.endDate.value || null;
		await this.postsService.update(post);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}

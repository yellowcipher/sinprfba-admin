import { Director } from './../../../../models/post';
import { PostsService } from './../../../../services/board.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'ngx-edit-board',
	templateUrl: './edit-board.component.html',
	styleUrls: [ './edit-board.component.scss' ],
})
export class EditBoardComponent implements OnInit {
	post$: Observable<Director>;
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

	ngOnInit() {
		const id = this.router.url.split('/').pop();
		this.post$ = this.postsService.records.pipe(
			filter((records) => records.length > 0),
			map((records) => records.find((record) => record.uid === id)),
		);
	}

	async update(post: Director) {
		post.mainImage = this.fileToUpload;
		await this.postsService.update(post);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}

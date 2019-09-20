import { Post } from './../../../../models/post';
import { PostsService } from './../../../../services/posts.service';
import { Component, OnInit } from '@angular/core';
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

	constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		const id = this.router.url.split('/').pop();
		this.post$ = this.postsService.records.pipe(
			filter((records) => records.length > 0),
			map((records) => records.find((record) => record.uid === id)),
		);
	}

	async update(post: Post) {
		await this.postsService.update(post);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}

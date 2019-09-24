import { Carrousel } from './../../../../models/post';
import { PostsService } from './../../../../services/carrousel.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
	selector: 'ngx-edit-carrousel',
	templateUrl: './edit-carrousel.component.html',
	styleUrls: [ './edit-carrousel.component.scss' ],
})
export class EditCarrouselComponent implements OnInit {
	post$: Observable<Carrousel>;

	constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		const id = this.router.url.split('/').pop();
		this.post$ = this.postsService.records.pipe(
			filter((records) => records.length > 0),
			map((records) => records.find((record) => record.uid === id)),
		);
	}

	async update(post: Carrousel) {
		await this.postsService.update(post);
		this.router.navigate([ '../../' ], { relativeTo: this.route });
	}
}

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ngx-posts',
	template: `
    <router-outlet></router-outlet>
  `,
	styleUrls: [ './posts.component.scss' ],
})
export class PostsComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}

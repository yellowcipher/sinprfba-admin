import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'ngx-posts',
	templateUrl: './posts.component.html',
	styleUrls: [ './posts.component.scss' ],
})
export class PostsComponent implements OnInit {
	items: Observable<any[]>;
	constructor(db: AngularFirestore) {
		this.items = db.collection('items').valueChanges();
	}

	ngOnInit() {}
}

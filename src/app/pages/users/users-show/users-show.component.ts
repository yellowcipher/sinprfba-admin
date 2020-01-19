import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'ngx-users-show',
	templateUrl: './users-show.component.html',
	styleUrls: [ './users-show.component.scss' ],
})
export class UsersShowComponent implements OnInit {
	record$: Observable<User>;
	userForm;

	constructor(private usersService: UsersService, private router: Router) {}

	ngOnInit() {
		this.userForm = new FormGroup({
			firstName: new FormControl(),
		});
		const id = this.router.url.split('/').pop();
		this.record$ = this.usersService.records.pipe(
			filter((records) => records.length > 0),
			map((records) => records.find((record) => record.uid === id)),
		);
	}
}

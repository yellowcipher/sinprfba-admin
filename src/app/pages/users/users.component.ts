import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
	selector: 'ngx-users',
	templateUrl: './users.component.html',
	styleUrls: [ './users.component.scss' ],
})
export class UsersComponent implements OnInit, OnDestroy {
	recordsSub: Subscription;

	settings = {
		mode: 'external',
		actions: {
			add: true,
			edit: true,
			delete: false,
		},
		add: {
			addButtonContent: '<i class="nb-plus"></i>',
		},
		edit: {
			editButtonContent: '<i class="nb-maximize"></i>',
		},
		columns: {
			cpf: {
				title: 'CPF',
				type: 'string',
			},
			firstName: {
				title: 'Nome',
				type: 'string',
			},
			email: {
				title: 'Email',
				type: 'string',
			},
			// createdAt: {
			// 	title: 'Criado em',
			// 	valuePrepareFunction: (cell, row) => (cell ? formatDate(cell.toDate(), 'short', 'pt') : null),
			// },
			// updatedAt: {
			// 	title: 'Atualizado em',
			// 	valuePrepareFunction: (cell, row) => (cell ? formatDate(cell.toDate(), 'short', 'pt') : null),
			// },
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.recordsSub = this.usersService.records.subscribe((recordsList) => {
			this.source.load(recordsList);
		});
	}

	ngOnDestroy() {
		this.recordsSub.unsubscribe();
	}

	onEdit({ data, source }) {
		this.router.navigate([ './', data['uid'] ], { relativeTo: this.route });
	}

	onCreate({ source }) {
		this.router.navigate([ 'user/new' ], { relativeTo: this.route });
	}
}

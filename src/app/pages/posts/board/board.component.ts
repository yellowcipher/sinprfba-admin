import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/board.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'ngx-board',
	templateUrl: './board.component.html',
	styleUrls: [ './board.component.scss' ],
})
export class BoardComponent implements OnInit, OnDestroy {
	recordsSub: Subscription;

	settings = {
		mode: 'external',
		add: {
			addButtonContent: '<i class="nb-plus"></i>',
			createButtonContent: '<i class="nb-checkmark"></i>',
			cancelButtonContent: '<i class="nb-close"></i>',
		},
		edit: {
			editButtonContent: '<i class="nb-edit"></i>',
			saveButtonContent: '<i class="nb-checkmark"></i>',
			cancelButtonContent: '<i class="nb-close"></i>',
		},
		delete: {
			deleteButtonContent: '<i class="nb-trash"></i>',
			confirmDelete: true,
		},
		columns: {
			mainImageUrl: {
				title: 'Imagem',
				filter: false,
				type: 'html',
				valuePrepareFunction: (cell, row) =>
					cell ? this.domSanitizer.bypassSecurityTrustHtml(`<img src="${cell}" width="100">`) : null,
			},
			title: {
				title: 'Título',
				type: 'string',
			},
			createdAt: {
				title: 'Criado em',
				valuePrepareFunction: (cell, row) => (cell ? formatDate(cell.toDate(), 'short', 'pt') : null),
			},
			updatedAt: {
				title: 'Atualizado em',
				valuePrepareFunction: (cell, row) => (cell ? formatDate(cell.toDate(), 'short', 'pt') : null),
			},
		},
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(
		private postsService: PostsService,
		private dialogService: NbDialogService,
		private domSanitizer: DomSanitizer,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.recordsSub = this.postsService.records.subscribe((recordsList) => {
			this.source.load(recordsList);
		});
	}

	ngOnDestroy() {
		this.recordsSub.unsubscribe();
	}

	onCreate({ source }) {
		this.router.navigate([ './new' ], { relativeTo: this.route });
	}

	onEdit({ data, source }) {
		this.router.navigate([ './edit', data['uid'] ], { relativeTo: this.route });
	}

	onDelete({ data, source }) {
		this.dialogService.open(DialogDeleteComponent).onClose.subscribe((deleted) => {
			if (deleted === true) {
				this.postsService.delete(data);
			}
		});
	}
}

import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
	selector: 'ngx-dialog-delete',
	templateUrl: './dialog-delete.component.html',
	styleUrls: [ './dialog-delete.component.scss' ],
})
export class DialogDeleteComponent {
	constructor(protected ref: NbDialogRef<DialogDeleteComponent>) {}

	cancel() {
		this.ref.close();
	}

	submit() {
		this.ref.close(true);
	}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NbDatepickerModule, NbCardModule, NbDialogModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { PostsRoutingModule, routedComponents } from './posts-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { BoardComponent } from './board/board.component';
import { NewBoardComponent } from './board/new-board/new-board.component';
import { EditBoardComponent } from './board/edit-board/edit-board.component';
import { NewCarrouselComponent } from './carrousel/new-board/new-carrousel.component';
import { EditCarrouselComponent } from './carrousel/edit-carrousel/edit-carrousel.component';

const COMPONENTS = [ DialogDeleteComponent ];

const ENTRY_COMPONENTS = [ DialogDeleteComponent ];

const MODULES = [
	PostsRoutingModule,
	FormsModule,
	ThemeModule,
	NbCardModule,
	NbDialogModule.forChild(),
	Ng2SmartTableModule,
	NbButtonModule,
	NbInputModule,
	CommonModule,
	ReactiveFormsModule,
	RichTextEditorAllModule,
	NbDatepickerModule,
];

@NgModule({
	imports: [ ...MODULES ],
	declarations: [
		...routedComponents,
		...COMPONENTS,
		EditNewsComponent,
		BoardComponent,
		NewBoardComponent,
		EditBoardComponent,
		NewCarrouselComponent,
		EditCarrouselComponent,
	],
	entryComponents: [ ...ENTRY_COMPONENTS ],
})
export class PostsModule {}

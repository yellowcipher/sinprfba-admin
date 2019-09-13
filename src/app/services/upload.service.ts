import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { join } from 'path';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	constructor(private storage: AngularFireStorage) {}

	upload(file: File, options: { filename: string; folder: string }): AngularFireUploadTask {
		const folder = options.folder || '';
		const filename = options.filename || file.name;
		const path = join(folder, filename);

		return this.storage.upload(path, file);
	}
}

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class UploadService {
	constructor(private storage: AngularFireStorage) {}

	upload(file: File, options?: { filename?: string; folder?: string }): Promise<string> {
		const folder = options.folder || '';
		const filename = options.filename || file.name;
		const path = this.join(folder, filename);
		const fileRef = this.storage.ref(path);
		const task = this.storage.upload(path, file);

		return new Promise((resolve) => {
			task.snapshotChanges().pipe(finalize(() => resolve(fileRef.getDownloadURL().toPromise()))).subscribe();
		});
	}

	removeFile(path: string): Promise<void> {
		return this.storage.ref(path).delete().toPromise();
	}

	private join(...args: string[]) {
		// Split the inputs into a list of path commands.
		let parts = [];
		for (let i = 0, l = args.length; i < l; i++) {
			parts = parts.concat(args[i].split('/'));
		}
		// Interpret the path commands to get the new resolved path.
		const newParts = [];
		for (let i = 0, l = parts.length; i < l; i++) {
			const part = parts[i];
			// Remove leading and trailing slashes
			// Also remove "." segments
			if (!part || part === '.') continue;
			// Interpret ".." to pop the last segment
			if (part === '..') newParts.pop();
			else
				// Push new path segments.
				newParts.push(part);
		}
		// Preserve the initial slash if there was one.
		if (parts[0] === '') newParts.unshift('');
		// Turn back into a single string path.
		return newParts.join('/') || (newParts.length ? '/' : '.');
	}
}

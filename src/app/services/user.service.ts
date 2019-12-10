import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { User } from '../models/user';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
		const path = 'users';
	}

	getUser(uid: string, queryFn?: QueryFn) {
		return this.afs.collection('users', queryFn).doc(uid).ref.get().then((doc) => {
			if (doc.exists) {
				const user = doc.data() as User;
				return user;
			}
		});
	}

	upload(file: File, options?: { filename?: string; folder?: string }): Promise<string> {
		const folder = options.folder || '';
		const filename = options.filename || file.name;
		const path = folder + filename;
		const fileRef = this.storage.ref(path);
		const task = this.storage.upload(path, file);

		return new Promise((resolve) => {
			task.snapshotChanges().pipe(finalize(() => resolve(fileRef.getDownloadURL().toPromise()))).subscribe();
		});
	}
}

import { UploadService } from './upload.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Director } from '../models/post';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private collection: AngularFirestoreCollection<Director>;
	public records: BehaviorSubject<Director[]> = new BehaviorSubject([]);

	private MAIN_IMAGE_NAME = 'mainImage.jpg';

	constructor(private afs: AngularFirestore, private uploadService: UploadService) {
		this.collection = this.afs.collection('carrousel');

		this.collection.valueChanges().subscribe((recordList) => this.records.next(recordList));
	}

	async add(record: Director) {
		const uid = this.afs.createId();
		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		const recordToSend: Director = {
			...record,
			uid,
			createdAt,
		};

		await this.uploadImage(recordToSend);

		return this.collection.doc(uid).set(recordToSend, { merge: true });
	}

	async update(record: Director) {
		const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
		const recordToUpdate: Director = {
			...record,
			updatedAt,
		};

		await this.uploadImage(recordToUpdate);

		return this.collection.doc(recordToUpdate.uid).set(recordToUpdate, { merge: true });
	}

	async delete(record: Director): Promise<void> {
		await this.deleteStorageFiles(record);
		return this.collection.doc(record.uid).delete();
	}

	private async uploadImage(record: Director) {
		if (record.mainImage != null) {
			record.mainImageUrl = await this.uploadService.upload(record.mainImage, {
				folder: record.uid,
				filename: this.MAIN_IMAGE_NAME,
			});
		}
		delete record.mainImage;
	}

	private deleteStorageFiles(record: Director): Promise<any[]> {
		const promisesArray = [];

		if (record.mainImageUrl != null) {
			promisesArray.push(this.uploadService.removeFile(`${record.uid}/${this.MAIN_IMAGE_NAME}`));
		}

		return Promise.all(promisesArray);
	}
}

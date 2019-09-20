import { UploadService } from './upload.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Post } from '../models/post';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private collection: AngularFirestoreCollection<Post>;
	public records: BehaviorSubject<Post[]> = new BehaviorSubject([]);

	private MAIN_IMAGE_NAME = 'mainImage.jpg';
	private buildSlideName(index: number) {
		return `slide${index}.jpg`;
	}

	constructor(private afs: AngularFirestore, private uploadService: UploadService) {
		this.collection = this.afs.collection('posts');

		this.collection.valueChanges().subscribe((recordList) => this.records.next(recordList));
	}

	async add(record: Post) {
		const uid = this.afs.createId();
		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		const recordToSend: Post = {
			...record,
			uid,
			createdAt,
		};

		// Upload and remove image files
		if (record.mainImage != null) {
			recordToSend.mainImageUrl = await this.uploadService.upload(record.mainImage, {
				folder: uid,
				filename: this.MAIN_IMAGE_NAME,
			});
		}
		delete recordToSend.mainImage;

		if (record.slides != null) {
			recordToSend.slidesUrls = [];
			for (let i: number = 0; i < record.slides.length; i++) {
				recordToSend.slidesUrls[i] = await this.uploadService.upload(record.slides[i], {
					folder: uid,
					filename: this.buildSlideName(i),
				});
			}
		}
		delete recordToSend.slides;
		return this.collection.doc(uid).set(recordToSend, { merge: true });
	}

	update(record: Post) {
		const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
		const recordToUpdate: Post = {
			...record,
			updatedAt,
		};
		return this.collection.doc(recordToUpdate.uid).set(recordToUpdate, { merge: true });
	}

	async delete(record: Post): Promise<void> {
		await this.deleteStorageFiles(record);
		return this.collection.doc(record.uid).delete();
	}

	private deleteStorageFiles(record: Post): Promise<any[]> {
		const promisesArray = [];

		if (record.mainImageUrl != null) {
			promisesArray.push(this.uploadService.removeFile(`${record.uid}/${this.MAIN_IMAGE_NAME}`));
		}

		// tslint:disable-next-line: forin
		for (const index in record.slidesUrls) {
			promisesArray.push(this.uploadService.removeFile(`${record.uid}/${this.buildSlideName(Number(index))}`));
		}

		return Promise.all(promisesArray);
	}
}

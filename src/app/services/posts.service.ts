import { UploadService } from './upload.service';
import { take, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private collection: AngularFirestoreCollection<Post>;

	constructor(private afs: AngularFirestore, private uploadService: UploadService) {
		this.collection = this.afs.collection('posts');
	}

	/**
   * @param post The post object complying to Post interface to be inserted in the Firestore
   */
	async createPost(post: Post) {
		const uid = this.afs.createId();
		const createdAt = Date.now();

		const postToSend: Post = {
			...post,
			uid,
			createdAt: new Date(createdAt),
		};

		// Upload and remove image files
		if (post.mainImage != null) {
			postToSend.mainImageUrl = await this.uploadService.upload(post.mainImage, { folder: uid });
			delete postToSend.mainImage;
		}

		if (post.slides != null) {
			postToSend.slidesUrls = [];
			for (let i: number = 0; i < post.slides.length; i++) {
				postToSend.slidesUrls[i] = await this.uploadService.upload(post.slides[i], { folder: uid });
			}
		}
		delete postToSend.slides;

		return this.collection.doc(uid).set(postToSend, { merge: true });
	}

	public updatePost(id: string, post: Post) {
		return this.collection.doc<Post>(id).update(post);
	}

	public deletePost(id: string) {
		return this.collection.doc(id).delete();
	}

	public getPost(id: string) {
		return this.collection.doc(id).valueChanges().pipe(take(1)).toPromise();
	}

	public listPosts(offset: number, startAt?: number) {
		return this.afs
			.collection<Post>('posts', (ref) => ref.orderBy('createdAt', 'desc').startAt(startAt).limit(offset))
			.valueChanges({ idField: 'id' })
			.pipe(take(1)) // this is used to make the observer emmit and END signal, so we can convert to promise
			.toPromise();
	}

	public search(propertyToCompare: string, queryString: string, orderedby: string = propertyToCompare) {
		return this.afs
			.collection<Post>('posts', (ref) => ref.where(`${propertyToCompare}`, '==', queryString).orderBy(orderedby))
			.valueChanges()
			.pipe(take(1))
			.toPromise();
	}

	// Helper methods
	public getFirstPost(fieldToOrder: string = 'createdAt', directionStr: firebase.firestore.OrderByDirection = 'desc') {
		return this.afs
			.collection<Post>('posts', (ref) => ref.orderBy(fieldToOrder, directionStr).limit(1))
			.valueChanges({ idField: 'id' })
			.pipe(take(1))
			.toPromise();
	}

	dynamicSearch(input$: Subject<string>, propertyToCompare: string, offset: number = 15) {
		const queryObservable = input$.pipe(
			switchMap((value) => {
				if (!value) {
					return of([]);
				} else {
					return this.afs
						.collection('posts', (ref) => {
							return ref.orderBy(propertyToCompare).startAt(value).endAt(value + '\uf8ff').limit(offset);
						})
						.valueChanges();
				}
			}),
		);
		return queryObservable;
	}
}

export interface Post {
	uid?: string;
	title: string;
	excerpt: string;
	font: string;
	content: string;
	mainImage: File;
	mainImageUrl?: string;
	slides?: File[];
	slidesUrls?: string[];
	files?: File[];
	filesUrls?: string[];
	createdAt?: Date;
	updatedAt?: Date;
	// userUpd: string;
	// dhPublicacao: string;
	// dhVigência?: string;
	// areaSite: string;
	// destaque: boolean;
	// tags: string;
	// estado: string;//cadastrado, cancelado, publicado, suspenso, não vigente
}

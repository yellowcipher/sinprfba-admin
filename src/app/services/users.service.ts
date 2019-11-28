import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private collection: AngularFirestoreCollection<User>;
	public records: BehaviorSubject<User[]> = new BehaviorSubject([]);

	constructor(private afs: AngularFirestore) {
		this.collection = this.afs.collection('users');

		this.collection.valueChanges().subscribe((recordList) => this.records.next(recordList));
	}
}

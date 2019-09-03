import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
	uid: string;
	email: string;
	photoURL?: string;
	displayName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	user: Observable<User>;

	constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
		//// Get auth data, then get firestore user document || null
		this.user = this.afAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					return of(null);
				}
			}),
		);
	}

	async register(email: string, password: string) {
		const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
		this.updateUserData(credential.user);
	}

	signInWithEmail(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	googleLogin() {
		const provider = new auth.GoogleAuthProvider();
		return this.oAuthLogin(provider);
	}

	facebookLogin() {
		const provider = new auth.FacebookAuthProvider();
		return this.oAuthLogin(provider);
	}

	twitterLogin() {
		const provider = new auth.TwitterAuthProvider();
		return this.oAuthLogin(provider);
	}

	private async oAuthLogin(provider) {
		const credential = await this.afAuth.auth.signInWithPopup(provider);
		this.updateUserData(credential.user);
	}

	private updateUserData(user) {
		// Sets user data to firestore on login

		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

		const data: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
		};

		return userRef.set(data, { merge: true });
	}

	signOut() {
		this.afAuth.auth.signOut().then(() => {
			this.router.navigate([ '/auth/login' ]);
		});
	}

	requestPass(email) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	confirmPasswordReset(code, newPassword) {
		return this.afAuth.auth.confirmPasswordReset(code, newPassword);
	}

	/*verifyPasswordResetCode(code){
    return this.afAuth.auth.verifyPasswordResetCode(code);
  }*/
}

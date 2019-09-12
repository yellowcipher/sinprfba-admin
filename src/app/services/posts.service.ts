import { take, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class PostsService {

  private collection: AngularFirestoreCollection<Post>;

  constructor( private afs: AngularFirestore) {
    this.collection = this.afs.collection('posts');
  }

  /**
   * @param post The post object complying to Post interface to be inserted in the Firestore
   */
  public createPost(post: Post) {
    post.createdAt = Date.now();
    return  this.collection.add(post);
  }

  public updatePost(id: string, post: Post) {
    return this.collection.doc<Post>(`${id}`).update(post);
  }

  public deletePost(id: string) {
    return this.collection.doc(`${id}`).delete();
  }

  public getPost(id: string) {
    return this.collection.doc(`${id}`).valueChanges().pipe(take(1)).toPromise();
  }

  public listPosts(offset: number, startAt?: number) {
     return this.afs.collection<Post>('posts', ref => ref.orderBy('createdAt', 'desc').startAt(startAt).limit(offset))
     .valueChanges({'idField': 'id'})
     .pipe(take(1)) // this is used to make the observer emmit and END signal, so we can convert to promise
     .toPromise();
  }

  public search(propertyToCompare: string, queryString: string, orderedby: string = propertyToCompare) {
    return this.afs.collection<Post>('posts', ref => ref.where(`${propertyToCompare}`, '==', queryString)
    .orderBy(orderedby))
    .valueChanges()
    .pipe(take(1))
    .toPromise();
  }

  // Helper methods
  public getFirstPost(fieldToOrder: string = 'createdAt', directionStr: firebase.firestore.OrderByDirection = 'desc') {
    return this.afs.collection<Post>('posts', ref => ref.orderBy(fieldToOrder, directionStr).limit(1))
    .valueChanges({'idField': 'id'})
    .pipe(take(1))
    .toPromise();
  }

  dynamicSearch(input$: Subject<string>, propertyToCompare: string, offset: number = 15) {
    const queryObservable = input$.pipe(
      switchMap(value => {
          if (!value) {
            return of([]);
          } else {
            return this.afs.collection('posts', ref => {
              return ref.orderBy(propertyToCompare).startAt(value).endAt(value + '\uf8ff').limit(offset);
            }).valueChanges();
          }
        },
      ),
    );
    return queryObservable;
  }

}

export interface Post {
  // id: string;
  title: string;
  createdAt: number;
  resumo: string;
  fonte: string;
  txPublicacao: string;
  imgPrincipal?: string;
  slides?: [string];
  arquivos?: [string];
  // dhCad: string;
  // userCad: string;
  dhUpd: string;
  // userUpd: string;
  // dhPublicacao: string;
  // dhVigência?: string;
  // areaSite: string;
  // destaque: boolean;
  // tags: string;
  // estado: string;//cadastrado, cancelado, publicado, suspenso, não vigente
}

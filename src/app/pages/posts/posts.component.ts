import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Post, PostsService } from './../../services/posts.service';

@Component({
	selector: 'ngx-posts',
	templateUrl: './posts.component.html',
	styleUrls: [ './posts.component.scss' ],
})
export class PostsComponent implements OnInit {
  posts: any[];
  searchedPosts: any[];
  prevKeys: number[] = [];
  nextKey: number;
  titleQuery$: Subject<string>;
  textField: string;

  constructor(public postsService: PostsService) {
    // subscribe to changes - input dynamic search
    this.titleQuery$ = new Subject<string>();
    const queryObservable = this.postsService.dynamicSearch(this.titleQuery$, 'title', 5);
    queryObservable.subscribe(queriedItems => {
      this.searchedPosts = queriedItems;
    });
  }

  ngOnInit() {
    this.postsService.getFirstPost().then( (firstPost) => {
      this.getPosts(firstPost[0].createdAt);
    });
  }

  public async createPost(title: string) {
    const post: Post = {
      'title': title,
      createdAt: 0,
    };
    const res = await this.postsService.createPost(post);
  }

  previousPage() {
    this.getPosts(this.prevKeys.pop());
  }

  nextPage() {
    this.prevKeys.push(this.posts[0].createdAt);
    this.getPosts(this.nextKey);
  }

  getPosts(startAt) {
    this.postsService.listPosts(6, startAt).then(
      (list) => {
        if (list.length === 6) {
          this.nextKey = list.pop().createdAt;
        } else {
          this.nextKey = null;
        }
        this.posts = list;
      },
    );
  }
}

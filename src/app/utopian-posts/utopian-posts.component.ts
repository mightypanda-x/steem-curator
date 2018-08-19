import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UtopianState} from '../utopian/reducers';
import * as UtopianActions from '../utopian/actions/utopian.actions';
import * as utopianSelectors from '../utopian/selectors';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/internal/operators';
import {MatSort, MatTableDataSource} from '@angular/material';
import {UtopianPostModel} from '../utopian/models/utopian.model';
import * as PostActions from '../post/actions/post.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-utopian-posts',
  templateUrl: './utopian-posts.component.html',
  styleUrls: ['./utopian-posts.component.scss']
})
export class UtopianPostsComponent implements OnInit, OnDestroy {

  isAlive = true;
  pendingSelected = true;
  filterText = '';
  pendingPost$: Observable<UtopianPostModel[]>;
  updatedPostsList$: Observable<UtopianPostModel[]>;
  postsDS = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['order', 'author', 'category', 'title', 'total_votes', 'total_payout', 'actions'];

  constructor(private store: Store<UtopianState>) {
    this.pendingPost$ = store.pipe(select(utopianSelectors.utopianPosts));
    this.updatedPostsList$ = store.pipe(select(utopianSelectors.utopianPostsWithVotes));
  }

  applyFilter(filterValue: string) {
    this.postsDS.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUnreviewedPosts();

    this.pendingPost$.pipe(takeWhile(() => this.isAlive)).subscribe((posts) => {
      this.postsDS = new MatTableDataSource(posts);
      this.postsDS.sort = this.sort;
      _.map(posts, (post) => {
        post.loading = true;
        this.store.dispatch(new PostActions.RetrievePostDetails([post]));
      });
    });

    this.updatedPostsList$.pipe(takeWhile(() => this.isAlive)).subscribe((posts) => {
      if (posts.length > 0) {
        this.postsDS = new MatTableDataSource(posts);
        this.postsDS.sort = this.sort;
      }
    });
  }

  getPendingPosts() {
    if (!this.pendingSelected) {
      this.filterText = '';
      this.pendingSelected = true;
      this.store.dispatch(new UtopianActions.RetrievePendingPosts());
    }
  }

  getUnreviewedPosts() {
    if (this.pendingSelected) {
      this.filterText = '';
      this.pendingSelected = false;
      this.store.dispatch(new UtopianActions.RetrieveUnreviewedPosts());
    }
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }

}

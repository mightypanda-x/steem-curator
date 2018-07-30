import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {UtopianState} from '../utopian/reducers';
import * as UtopianActions from '../utopian/actions/utopian.actions';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/internal/operators';
import * as _ from 'lodash';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-utopian-posts',
  templateUrl: './utopian-posts.component.html',
  styleUrls: ['./utopian-posts.component.scss']
})
export class UtopianPostsComponent implements OnInit, OnDestroy {

  isAlive = true;
  pendingSelected = true;
  filterText = '';
  pendingPost$: Observable<UtopianState>;
  postsDS = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['order', 'author', 'category', 'title', 'total_votes', 'total_payout'];

  constructor(private store: Store<UtopianState>) { }

  applyFilter(filterValue: string) {
    this.postsDS.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUnreviewedPosts();

    this.pendingPost$ = this.store.select('utopian');
    this.pendingPost$.pipe(takeWhile(() => this.isAlive)).subscribe((pendingPosts) => {
      if (_.has(pendingPosts, 'posts')) {
        this.postsDS = new MatTableDataSource(pendingPosts.posts);
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

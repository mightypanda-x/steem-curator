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
  pendingPost$: Observable<UtopianState>;
  pendingPostsDS = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['order', 'author', 'category', 'title', 'total_votes', 'total_payout'];

  constructor(private store: Store<UtopianState>) { }

  ngOnInit() {
    this.store.dispatch(new UtopianActions.RetrievePendingPosts());

    this.pendingPost$ = this.store.select('utopian');
    this.pendingPost$.pipe(takeWhile(() => this.isAlive)).subscribe((pendingPosts) => {
      console.log('**', pendingPosts);
      if (_.has(pendingPosts, 'pending')) {
        this.pendingPostsDS = new MatTableDataSource(pendingPosts.pending);
        this.pendingPostsDS.sort = this.sort;
      }
    })
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UtopianState} from '../utopian/reducers';
import * as UtopianActions from '../utopian/actions/utopian.actions';

@Component({
  selector: 'app-utopian-posts',
  templateUrl: './utopian-posts.component.html',
  styleUrls: ['./utopian-posts.component.scss']
})
export class UtopianPostsComponent implements OnInit, OnDestroy {

  isAlive = true;

  constructor(private store: Store<UtopianState>) { }

  ngOnInit() {
    this.store.dispatch(new UtopianActions.RetrievePendingPosts());
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }

}

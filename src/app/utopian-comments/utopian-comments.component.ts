import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UtopianState} from '../utopian/reducers';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {UtopianCommentModel} from '../utopian/models/utopian.model';
import * as utopianSelectors from '../utopian/selectors';
import {takeWhile} from 'rxjs/internal/operators';
import * as UtopianActions from '../utopian/actions/utopian.actions';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ProfileSettingsModel} from '../profile/models/profileSettings.model';
import * as profileSelectors from '../profile/selectors';
import * as PostActions from '../post/actions/post.actions';

@Component({
  selector: 'app-utopian-comments',
  templateUrl: './utopian-comments.component.html',
  styleUrls: ['./utopian-comments.component.scss']
})
export class UtopianCommentsComponent implements OnInit, OnDestroy {

  isAlive = true;
  sitePreference: string;
  modComments$: Observable<UtopianCommentModel[]>;
  updatedCommentsList$: Observable<UtopianCommentModel[]>;
  profileSettings$: Observable<ProfileSettingsModel>;
  commentsDS = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['order', 'author', 'permlink', 'total_votes', 'total_payout', 'duration', 'actions'];

  constructor(private store: Store<UtopianState>) {
    this.modComments$ = store.pipe(select(utopianSelectors.utopianComments));
    this.updatedCommentsList$ = store.pipe(select(utopianSelectors.utopianCommentsWithVoters));
    this.profileSettings$ = store.pipe(select(profileSelectors.profileSettings));
  }

  ngOnInit() {
    // Action to retrieve mod comments from backend service.
    this.store.dispatch(new UtopianActions.RetrieveModComments());
    this.modComments$.pipe(takeWhile(() => this.isAlive)).subscribe((comments) => {
      // Feed comment results to material table
      this.commentsDS = new MatTableDataSource(comments);
      this.commentsDS.sort = this.sort;
      _.map(comments, (comment) => {
        comment.loading = true;
        // Iterate over each comment and get more information using steem api
        this.store.dispatch(new PostActions.RetrievePostDetails([comment]));
      });

    });
    // Retrieve profile settings from local store.
    this.profileSettings$.pipe(takeWhile(() => this.isAlive)).subscribe((settings) => {
      this.sitePreference = _.get(settings, 'sitePreference', 'steemit.com');
    });

    this.updatedCommentsList$.pipe(takeWhile(() => this.isAlive)).subscribe((comments) => {
      if (comments.length > 0) {
        this.commentsDS = new MatTableDataSource(comments);
        this.commentsDS.sort = this.sort;
      }
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}

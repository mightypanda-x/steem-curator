import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as PostActions from '../post/actions/post.actions';
import {select, Store} from '@ngrx/store';
import * as _ from 'lodash';
import * as postSelectors from '../post/selectors';
import {Observable} from 'rxjs';
import {PostModel} from '../post/models/post.model';
import {takeWhile} from 'rxjs/internal/operators';
import {MatSort, MatTableDataSource} from '@angular/material';
import * as profileSelectors from '../profile/selectors';
import {ProfileSettingsModel} from '../profile/models/profileSettings.model';

@Component({
  selector: 'app-oracle-d-posts',
  templateUrl: './oracle-d-posts.component.html',
  styleUrls: ['./oracle-d-posts.component.scss']
})
export class OracleDPostsComponent implements OnInit, OnDestroy {

  private oracleDList: string[] = ['ireneblessing', 'teekingtv', 'dedicatedguy', 'bait002', 'flaws', 'brayan256', 'meemee', 'jona12',
    'yohan2on', 'ulqu3', 'king-oghie', 'bookoons', 'manchochris', 'suheri', 'ettydiallova', 'musamalijames', 'nowonline', 'roseri',
    'horpey'];
  // private oracleDList: string[] = ['roseri'];
  isAlive = true;
  sitePreference: string;
  postsList$: Observable<PostModel[]>;
  profileSettings$: Observable<ProfileSettingsModel>;
  oraclePostsDS = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['order', 'author', 'permlink', 'total_votes', 'total_payout', 'duration', 'actions'];
  constructor(private store: Store<any>) {
    this.postsList$ = store.pipe(select(postSelectors.getOracleDPosts));
    this.profileSettings$ = store.pipe(select(profileSelectors.profileSettings));
  }

  ngOnInit() {
    _.forEach(this.oracleDList, (author) => {
      this.store.dispatch(new PostActions.RetrievePostsForUsers([author]));
    });
    // Retrieve profile settings from local store.
    this.profileSettings$.pipe(takeWhile(() => this.isAlive)).subscribe((settings) => {
      this.sitePreference = _.get(settings, 'sitePreference', 'steemit.com');
    });
    this.postsList$.pipe(takeWhile(() => this.isAlive)).subscribe((posts) => {
      if (posts.length > 0) {
        this.oraclePostsDS = new MatTableDataSource(posts);
        this.oraclePostsDS.sort = this.sort;
      }
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
    this.store.dispatch(new PostActions.ClearPostList());
  }
}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as BotActions from '../bot/actions/bot.actions';
import * as PostActions from '../post/actions/post.actions';
import {BotsListState, BotState} from '../bot/reducers';
import {select, Store} from '@ngrx/store';
import {interval, Observable} from 'rxjs';
import * as fromSelectors from '../bot/selectors';
import * as postSelectors from '../post/selectors';
import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';
import {takeWhile} from 'rxjs/internal/operators';
import {BidModel} from '../bot/models/bid.model';
import {PostState} from '../post/reducers';
import {PostModel} from '../post/models/post.model';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-comment-curation',
  templateUrl: './comment-curation.component.html',
  styleUrls: ['./comment-curation.component.scss']
})
export class CommentCurationComponent implements OnInit, OnDestroy {

  commentBotList: string[];
  bidsList$: Observable<BidModel[]>;
  botsList$: Observable<string[]>;
  postList$: Observable<PostModel[]>;
  isAlive = true;

  displayedColumns: string[] = ['sender', 'body', 'amount', 'net_votes', 'pending_payout_value', 'actions'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<BotState | BotsListState | PostState>) {
    this.bidsList$ = store.pipe(select(fromSelectors.getCommentBids));
    this.botsList$ = store.pipe(select(fromSelectors.getCommentSupportingBots));
    this.postList$ = store.pipe(select(postSelectors.getPostsWithVotes));
  }

  ngOnInit() {
    fontawesome.library.add(faExternalLinkAlt);

    // First get a list of bots that upvote comment and then get the bids on those bots.
    this.botsList$.pipe(takeWhile(() => this.isAlive)).subscribe((commentBots) => {
      this.commentBotList = commentBots;
      // Dispatching action to get current bids when the page loads.
      this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    });
    this.store.dispatch(new BotActions.RetrieveBotList());


    // Running the calls in a loop to update bids list.
    const fireInterval = interval(60000);
    fireInterval.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    });

    // After getting a list of all the comment post, this code will get data for the posts.
    this.bidsList$.pipe(takeWhile(() => this.isAlive)).subscribe((bidsList) => {
      if (bidsList.length > 0) {
        this.store.dispatch(new PostActions.RetrievePostDetails(bidsList));
      }
    });

    this.postList$.pipe(takeWhile(() => this.isAlive)).subscribe((postsList) => {
      this.dataSource = new MatTableDataSource(postsList);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }

}

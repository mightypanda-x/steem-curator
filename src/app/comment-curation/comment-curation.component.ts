import {Component, OnDestroy, OnInit} from '@angular/core';
import * as BotActions from '../bot/actions/bot.actions';
import {BotsListState, BotState} from '../bot/reducers';
import {select, Store} from '@ngrx/store';
import {interval, Observable} from 'rxjs';
import * as fromSelectors from '../bot/selectors';
import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';
import {takeWhile} from 'rxjs/internal/operators';
import {BidModel} from '../bot/models/bid.model';

@Component({
  selector: 'app-comment-curation',
  templateUrl: './comment-curation.component.html',
  styleUrls: ['./comment-curation.component.css']
})
export class CommentCurationComponent implements OnInit, OnDestroy {

  commentBotList: string[];
  bidsList$: Observable<BidModel[]>;
  botsList$: Observable<string[]>;
  isAlive = true;

  constructor(private store: Store<BotState | BotsListState>) {
    this.bidsList$ = store.pipe(select(fromSelectors.getCommentBids));
    this.botsList$ = store.pipe(select(fromSelectors.getCommentSupportingBots));
  }

  ngOnInit() {
    // First get a list of bots that upvote comment and then get the bids on those bots.
    this.botsList$.pipe(takeWhile(() => this.isAlive)).subscribe((commentBots) => {
      this.commentBotList = commentBots;
      // Dispatching action to get current bids when the page loads.
      this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    });
    fontawesome.library.add(faExternalLinkAlt);
    this.store.dispatch(new BotActions.RetrieveBotList());

    // Running the calls in a loop to update bids list.
    const fireInterval = interval(60000);
    fireInterval.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    });
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }

}

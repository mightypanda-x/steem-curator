import {Component, OnDestroy, OnInit} from '@angular/core';
import * as BotActions from '../bot/actions/bot.actions';
import {BotsListState, BotState} from '../bot/reducers';
import {select, Store} from '@ngrx/store';
import {interval, Observable} from 'rxjs';
import * as fromBidsSelectors from '../bot/selectors';
import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-comment-curation',
  templateUrl: './comment-curation.component.html',
  styleUrls: ['./comment-curation.component.css']
})
export class CommentCurationComponent implements OnInit, OnDestroy {

  commentBotList: string[];
  bidsList$: Observable<any>;
  isAlive = true;

  constructor(private store: Store<BotState | BotsListState>) {
    // List of the bots that are currently being tracked. This will eventually either come from a config file or an api.
    this.commentBotList = ['oceanwhale', 'estabond', 'edensgarden', 'emperorofnaps', 'whalecreator', 'minnowvotes', 'thebot', 'siditech',
     'brandonfrye', 'dolphinbot', 'brupvoter', 'ubot', 'profitbot', 'lrd', 'a-bot', 'booster'];
    this.bidsList$ = store.pipe(select(fromBidsSelectors.getCommentBids));
  }

  ngOnInit() {
    fontawesome.library.add(faExternalLinkAlt);
    this.store.dispatch(new BotActions.RetrieveBotList());
    // Dispatching action to get current bids when the page loads.
    this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    // Running the calls in a loop to update bids list.
    const fireInterval = interval(60000);
    fireInterval.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.store.dispatch(new BotActions.RetrieveBotInformation(this.commentBotList));
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}

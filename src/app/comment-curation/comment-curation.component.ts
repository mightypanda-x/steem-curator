import {Component, OnDestroy, OnInit} from '@angular/core';
import * as BotActions from '../bot/actions/bot.actions';
import {BotState} from '../bot/reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import * as fromBidsSelectors from '../bot/selectors';
import fontawesome from '@fortawesome/fontawesome';
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-comment-curation',
  templateUrl: './comment-curation.component.html',
  styleUrls: ['./comment-curation.component.css']
})
export class CommentCurationComponent implements OnInit, OnDestroy {

  commentBotList: string[];
  bidsList$: Observable<any>;
  commentCallInterval: any;

  constructor(private store: Store<BotState>) {
    // List of the bots that are currently being tracked. This will eventually either come from a config file or an api.
    this.commentBotList = ['oceanwhale', 'estabond', 'edensgarden', 'emperorofnaps', 'whalecreator', 'minnowvotes', 'thebot', 'siditech',
     'brandonfrye', 'dolphinbot', 'brupvoter', 'ubot', 'profitbot', 'lrd', 'a-bot', 'booster'];
    this.bidsList$ = store.pipe(select(fromBidsSelectors.getCommentBids));
  }

  ngOnInit() {
    fontawesome.library.add(faExternalLinkAlt);
    // Dispatching action to get current bids when the page loads.
    this.dispatchCommentActions();
    // Running the calls in a loop to update bids list.
    this.commentCallInterval = setInterval(() => {
      this.store.dispatch(new BotActions.ClearBotInformation());
      setTimeout(this.dispatchCommentActions(), 100);
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.commentCallInterval);
  }

  /*
  * This method dispatches one call for each bot.
   */
  dispatchCommentActions = () => {
    _.forEach(this.commentBotList, (botName) => {
      this.store.dispatch(new BotActions.RetrieveBotInformation(botName));
    });
  }

}

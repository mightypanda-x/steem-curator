import { Component, OnInit } from '@angular/core';
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
export class CommentCurationComponent implements OnInit {

  commentBotList: string[];
  bidsList$: Observable<any>;

  constructor(private store: Store<BotState>) {
    // this.commentBotList = ['oceanwhale'];
    this.commentBotList = ['oceanwhale', 'estabond', 'edensgarden', 'emperorofnaps', 'whalecreator', 'minnowvotes', 'thebot', 'siditech',
     'brandonfrye', 'dolphinbot', 'brupvoter', 'ubot', 'profitbot', 'lrd', 'a-bot', 'booster'];
    this.bidsList$ = store.pipe(select(fromBidsSelectors.getCommentBids));
  }

  ngOnInit() {
    fontawesome.library.add(faExternalLinkAlt);
    this.dispatchCommentActions();
    setInterval(() => {
      this.store.dispatch(new BotActions.ClearBotInformation());
      this.dispatchCommentActions();
    }, 60000);
  }

  dispatchCommentActions = () => {
    _.forEach(this.commentBotList, (botName) => {
      this.store.dispatch(new BotActions.RetriveBotInformation(botName));
    });
  }

}

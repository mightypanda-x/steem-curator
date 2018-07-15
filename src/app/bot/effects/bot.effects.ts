import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BotService} from '../services/bot.service';
import {
  BotActionTypes, RetrieveBotInformation, RetrieveBotInformationSuccess, RetrieveBotList, RetrieveBotListSuccess
} from '../actions/bot.actions';
import {catchError, map, flatMap, switchMap} from 'rxjs/internal/operators';
import * as _ from 'lodash';
import {BidListModel} from '../models/bidList.model';

@Injectable()
export class BotEffects {
  /*
  * This effect intercepts RetrieveBotInformation action and calls the service.
   */
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(BotActionTypes.RetrieveBotInformation),
    flatMap((action: RetrieveBotInformation) => this.botService.retrieveCurrentVotes(action.payload)
    .pipe(
      catchError(error => this.botService.handleError(error)),
      map(
        (bidList: BidListModel[]) => new RetrieveBotInformationSuccess(
          _.flatMap(bidList, (bid: BidListModel) => _.get(bid, 'current_round', []))
        )
      )
    ))
  );

  /*
  * This effect intercepts RetrieveBotList action and calls the service to get list of bid bots.
   */
  @Effect()
  getBotsList = this.actions.pipe(
    ofType(BotActionTypes.RetrieveBotList),
    switchMap((action: RetrieveBotList) => this.botService.retrieveBotsList()
      .pipe(
        catchError(error => this.botService.handleError(error)),
        map((botList: any) => new RetrieveBotListSuccess(botList))
      ))
  );

  constructor(
    private actions: Actions,
    private botService: BotService
  ) {}
}

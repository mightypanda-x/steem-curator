import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {BidModel} from '../models/bid.model';
import {Store} from '@ngrx/store';
import {RetrieveBotInformationFailure} from '../actions/bot.actions';
import * as _ from 'lodash';
import * as steem from 'steem';
import {BidListModel} from '../models/bidList.model';
import {BotModel} from '../models/bot.model';

@Injectable()
export class BotService {
  private apiUrl = 'https://steembottracker.net';
  constructor(private http: HttpClient, private store: Store<BidModel>) {}
  /*
  * This method will make a call to steembottracker api to get all bids in current round.
  * It will return an observable of BidModel Array
  * */
  public retrieveCurrentVotes(botNames: string[]): Observable<BidListModel[]> {
    // forkJoin will make call with all the bot names and join all the results into one array before returning.
    return forkJoin(
      _.map(botNames, (botName) => {
      return this.http
        .get<BidModel[]>(`${this.apiUrl}/bid_bots/${botName}`,
          {responseType: 'json'});
      })
    );
  }
  public retrieveBotsList(): Observable<BotModel[]> {
    return this.http
      .get<any>(`${this.apiUrl}/bid_bots`,
        {responseType: 'json'});
  }
  public handleError(error: HttpErrorResponse): Observable<BidModel> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetrieveBotInformationFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Auth Error: ${JSON.stringify(error, null, 2)}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {BidModel} from '../models/bid.model';
import {Store} from '@ngrx/store';
import {RetriveBotInformationFailure} from '../actions/bot.actions';

@Injectable()
export class BotService {
  constructor(private http: HttpClient, private store: Store<BidModel>) {}
  public retrieveCurrentVotes(botName: string): Observable<BidModel[]> {
    return this.http
      .get<BidModel[]>(`https://steembottracker.net/bid_bots/${botName}`,
        {responseType: 'json'});
  }
  public handleError(error: HttpErrorResponse): Observable<BidModel> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetriveBotInformationFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Auth Error: ${JSON.stringify(error, null, 2)}`);
  }
}

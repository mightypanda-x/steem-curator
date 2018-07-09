import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {UserProfile} from '../models/profile.model';
import {RetrieveUserProfileFailure} from '../actions/profile.actions';
import {Store} from '@ngrx/store';
import * as steem from 'steem';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private store: Store<UserProfile>) {}
  public retrieveProfile(username: string, cb): Promise<any> {
    return steem.api.getAccountsAsync([username], cb);
  }
  public handleAuthError(error: HttpErrorResponse): Observable<UserProfile> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetrieveUserProfileFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Auth Error: ${JSON.stringify(error, null, 2)}`);
  }
}

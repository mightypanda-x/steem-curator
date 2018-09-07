import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {UserProfile} from '../models/profile.model';
import {RetrieveUserProfileFailure} from '../actions/profile.actions';
import {Store} from '@ngrx/store';
import * as steem from 'steem';
import {ProfileSettingsModel} from '../models/profileSettings.model';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private store: Store<UserProfile>) {}
  public retrieveProfile(username: string, cb): Promise<any> {
    return steem.api.getAccountsAsync([username], cb);
  }

  // Saving settings in localStorage of the browser for persistence.
  public saveProfileSettings(settings: ProfileSettingsModel): void {
    return localStorage.setItem('userPreferences', JSON.stringify(settings));
  }
  public loadProfileSettings(): Observable<ProfileSettingsModel> {
    const userPreferences = localStorage.getItem('userPreferences');
    return of(JSON.parse(userPreferences));
  }
  public handleError(error: HttpErrorResponse): Observable<UserProfile> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status !== 200) {
      this.store.dispatch(new RetrieveUserProfileFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }
}

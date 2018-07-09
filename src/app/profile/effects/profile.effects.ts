import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from '../services/profile.service';
import {ProfileActionTypes, RetrieveUserProfileSuccess, RetriveUserProfile} from '../actions/profile.actions';
import {catchError, exhaustMap} from 'rxjs/internal/operators';
import {ProfileState} from '../reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class ProfileEffects {
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(ProfileActionTypes.RetrieveUserProfile),
    exhaustMap((action: RetriveUserProfile) => this.profileService.retrieveProfile(action.payload, (err, userProfile) => {
      if (err) {
        catchError(error => this.profileService.handleAuthError(error));
      }
      this.store.dispatch(new RetrieveUserProfileSuccess(userProfile[0]));
    }))
  );

  constructor(
    private actions: Actions,
    private store: Store<ProfileState>,
    private profileService: ProfileService
  ) {}
}

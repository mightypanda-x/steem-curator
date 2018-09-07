import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from '../services/profile.service';
import {
  LoadProfileSetting, LoadProfileSettingSuccess,
  ProfileActionTypes,
  RetrieveUserProfileSuccess,
  RetriveUserProfile,
  SaveProfileSetting
} from '../actions/profile.actions';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/internal/operators';
import {ProfileState} from '../reducers';
import {Store} from '@ngrx/store';
import {ProfileSettingsModel} from '../models/profileSettings.model';

@Injectable()
export class ProfileEffects {
  @Effect()
  getUserProfile = this.actions.pipe(
    ofType(ProfileActionTypes.RetrieveUserProfile),
    exhaustMap((action: RetriveUserProfile) => this.profileService.retrieveProfile(action.payload, (err, userProfile) => {
      if (err) {
        catchError(error => this.profileService.handleError(error));
      }
      this.store.dispatch(new RetrieveUserProfileSuccess(userProfile[0]));
    }))
  );

  @Effect({ dispatch: false })
  saveProfileSettings = this.actions.pipe(
    ofType(ProfileActionTypes.SaveProfileSetting),
    map((action: SaveProfileSetting) => this.profileService.saveProfileSettings(action.payload))
  );

  @Effect()
  loadProfileSettings = this.actions.pipe(
    ofType(ProfileActionTypes.LoadProfileSetting),
    switchMap((action: LoadProfileSetting) => this.profileService.loadProfileSettings()
      .pipe(
        catchError(error => this.profileService.handleError(error)),
        map((profileSettings: ProfileSettingsModel) => new LoadProfileSettingSuccess(profileSettings))
      ))
  );
  constructor(
    private actions: Actions,
    private store: Store<ProfileState>,
    private profileService: ProfileService
  ) {}
}

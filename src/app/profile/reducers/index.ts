import * as fromProfile from './profile.reducers';
import {UserProfile} from '../models/profile.model';
import {ActionReducerMap} from '@ngrx/store';
import {ProfileSettingsModel} from '../models/profileSettings.model';

export interface ProfileState {
  profile: UserProfile;
  settings: ProfileSettingsModel;
}

export const reducers: ActionReducerMap<ProfileState> = {
  profile: fromProfile.reducer,
  settings: fromProfile.settingsReducer
};

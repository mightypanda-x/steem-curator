import { Action } from '@ngrx/store';
import {UserProfile} from '../models/profile.model';
import {ProfileSettingsModel} from '../models/profileSettings.model';

export enum ProfileActionTypes {
  RetrieveUserProfile = '[Profile] Retrieve Profile',
  RetrieveUserProfileSuccess = '[Profile] Retrieve Profile Successful',
  RetrieveUserProfileFailure = '[Profile] Retrieve Profile Failed',
  SaveProfileSetting = '[Profile] Save Settings',
  LoadProfileSetting = '[Profile] Load Settings',
  LoadProfileSettingSuccess = '[Profile] Load Settings Success',
}
export class RetriveUserProfile implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfile;

  constructor(public payload: string) {}
}

export class RetrieveUserProfileSuccess implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfileSuccess;

  constructor(public payload: UserProfile) {}
}

export class RetrieveUserProfileFailure implements Action {
  readonly type = ProfileActionTypes.RetrieveUserProfileFailure;

  constructor(public error: any) {}
}

// This action will save profile settings in local storage and update the state object.
export class SaveProfileSetting implements Action {
  readonly type = ProfileActionTypes.SaveProfileSetting;

  constructor(public payload: ProfileSettingsModel) {}
}

// This action will load profile settings from local storage and update the state.
export class LoadProfileSetting implements Action {
  readonly type = ProfileActionTypes.LoadProfileSetting;
}

export class LoadProfileSettingSuccess implements Action {
  readonly type = ProfileActionTypes.LoadProfileSettingSuccess;

  constructor(public payload: ProfileSettingsModel) {}
}

export type ProfileActions = RetriveUserProfile
  | RetrieveUserProfileSuccess
  | RetrieveUserProfileFailure
  | SaveProfileSetting
  | LoadProfileSetting
  | LoadProfileSettingSuccess;

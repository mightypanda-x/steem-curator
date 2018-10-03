import {UserProfile} from '../models/profile.model';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';
import {ProfileSettingsModel} from '../models/profileSettings.model';
import {ProfileState} from './index';
import * as _ from 'lodash';

export function reducer(state, action: ProfileActions): UserProfile {
  switch (action.type) {
    case ProfileActionTypes.RetrieveUserProfile: {
      return  { ...state, loading: true };
    }
    case ProfileActionTypes.RetrieveUserProfileSuccess: {
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}

// Update the state with settings saved by the user
export function settingsReducer(state, action: ProfileActions): ProfileSettingsModel {
  switch (action.type) {
    case ProfileActionTypes.SaveProfileSetting: {
      return  { ...state, ...action.payload };
    }
    case ProfileActionTypes.LoadProfileSettingSuccess: {
      return  { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getProfileSettings = (state: ProfileState) => _.get(state, 'settings', '');

export const getProfileUsername = (profileSetting: ProfileSettingsModel) => {
  // Iterate over first array of objects
  return _.get(profileSetting, 'username', '');
};

export const getSitePreference = (profileSetting: ProfileSettingsModel) => {
  return _.get(profileSetting, 'sitePreference', 'steemit.com');
};

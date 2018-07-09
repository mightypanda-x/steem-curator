import {UserProfile} from '../models/profile.model';
import {ProfileActions, ProfileActionTypes} from '../actions/profile.actions';

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

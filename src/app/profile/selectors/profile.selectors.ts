import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from '../reducers';
import * as fromProfile from '../reducers/profile.reducers';

export const selectProfile = createFeatureSelector<ProfileState>('user');

export const profileSettings = createSelector(selectProfile, fromProfile.getProfileSettings);

export const profileUsername = createSelector(profileSettings, fromProfile.getProfileUsername);

export const sitePreferenece = createSelector(profileSettings, fromProfile.getSitePreference);

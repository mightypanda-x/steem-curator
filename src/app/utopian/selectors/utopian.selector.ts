import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UtopianState} from '../reducers';
import * as fromUtopian from '../reducers/utopian.reducers';
import {getPostsList} from '../../post/selectors';
import {profileUsername, sitePreferenece} from '../../profile/selectors/profile.selectors';

export const selectPosts = createFeatureSelector<UtopianState>('utopian');

export const utopianPostsList = createSelector(selectPosts, fromUtopian.getUtopianPostsList);

export const utopianPosts = createSelector(utopianPostsList, sitePreferenece, fromUtopian.getUtopianPosts);

export const utopianPostsWithVotes = createSelector(utopianPosts, getPostsList, profileUsername, fromUtopian.utopianPostsWithVoters);

// Getting lost of comments
export const utopianCommentsList = createSelector(selectPosts, fromUtopian.getUtopianCommentsList);

// Adding site preferences for utopian
export const utopianComments = createSelector(utopianCommentsList, sitePreferenece, fromUtopian.getUtopianComments);

// User settings are used to update comments and add payout information
export const utopianCommentsWithVoters =
  createSelector(utopianComments, getPostsList, profileUsername, fromUtopian.utopianCommentsWithVoters);

import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UtopianState} from '../reducers';
import * as fromUtopian from '../reducers/utopian.reducers';
import {getPostsList} from '../../post/selectors';

export const selectPosts = createFeatureSelector<UtopianState>('utopian');

export const utopianPostsList = createSelector(selectPosts, fromUtopian.getUtopianPostsList);

export const utopianPosts = createSelector(utopianPostsList, fromUtopian.getUtopianPosts);

export const utopianPostsWithVotes = createSelector(utopianPosts, getPostsList, fromUtopian.utopianPostsWithVoters);

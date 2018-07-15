import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostState} from '../reducers';
import * as fromPost from '../reducers/post.reducers';
import {getCommentBids} from '../../bot/selectors';

export const selectPosts = createFeatureSelector<PostState>('posts');

export const getPostsList = createSelector(
  selectPosts,
  fromPost.getPostsList
);

/*
* This code will combine posts list an comment list to genarate a merged object of the two.
 */
export const getPostsWithVotes = createSelector(
  getPostsList,
  getCommentBids,
  fromPost.getPostsWithVotes
);

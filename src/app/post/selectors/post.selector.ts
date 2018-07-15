import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostState} from '../reducers';
import * as fromPost from '../reducers/post.reducers';
import {getCommentBids} from '../../bot/selectors';

export const selectPosts = createFeatureSelector<PostState>('posts');

export const getPostsList = createSelector(
  selectPosts,
  fromPost.getPostsList
);

export const getPostsWithVotes = createSelector(
  getPostsList,
  getCommentBids,
  fromPost.getPostsWithVotes
);

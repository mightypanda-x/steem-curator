import {UtopianActions, UtopianActionTypes} from '../actions/utopian.actions';
import {UtopianPostModel} from '../models/utopian.model';
import * as _ from 'lodash';
import {UtopianState} from './index';
import {PostModel} from '../../post/models/post.model';

export function reducer(state, action: UtopianActions): UtopianPostModel[] {
  switch (action.type) {
    case UtopianActionTypes.RetrievePendingPostsSuccess: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

const username = 'mightypanda';
// Retrieve post list from state
export const getUtopianPostsList = (state: UtopianState) => _.get(state, 'posts', '');

// add permlink to the utopian posts object
export const getUtopianPosts = (postsList: UtopianPostModel[]) => {
  // Iterate over first array of objects
  return _.map(postsList, (post) => {
    post.permlink = post.url.substr((post.url.lastIndexOf('/') + 1), post.url.length);
    return post;
  });
};

export const utopianPostsWithVoters = (utopianPosts: UtopianPostModel[], postsList: PostModel[]) => {
  if (_.isEmpty(postsList)) return [];
  return _.map(utopianPosts, (post) => {
    const postObject = _.find(postsList, {permlink: post.permlink});
    if (postObject) {
      post.loading = false;
      if (_.has(postObject, 'error')) {
        post.error = true;
      } else {
        console.log(postObject);
        const activeVotes = _.map(_.get(postObject, 'active_votes', []), 'voter');
        if (_.indexOf(activeVotes, username) >= 0) {
          post.hasUpvoted = true;
          post.error = false;
        }
        if (postObject.author === username) {
          post.isAuthor = true;
        }
      }
    }
    return post;
  });
};

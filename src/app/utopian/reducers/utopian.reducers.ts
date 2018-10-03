import {UtopianActions, UtopianActionTypes} from '../actions/utopian.actions';
import {UtopianCommentModel, UtopianPostModel} from '../models/utopian.model';
import * as _ from 'lodash';
import {UtopianState} from './index';
import {PostModel} from '../../post/models/post.model';
import * as moment from 'moment';

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

export function modCommentReducer(state, action: UtopianActions): UtopianCommentModel[] {
  switch (action.type) {
    case UtopianActionTypes.RetrieveModCommentsSuccess: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

// Retrieve post list from state
export const getUtopianPostsList = (state: UtopianState) => _.get(state, 'posts', '');

// Retrieve moderator Comments list from state
export const getUtopianCommentsList = (state: UtopianState) => _.get(state, 'comments', '');

// add permlink to the utopian posts object
export const getUtopianPosts = (postsList: UtopianPostModel[], sitePreference: string) => {
  // Iterate over first array of objects
  return _.map(postsList, (post) => {
    post.permlink = post.url.substr((post.url.lastIndexOf('/') + 1), post.url.length);
    if (sitePreference) {
      post.url = post.url.replace('steemit.com', sitePreference);
    }
    return post;
  });
};

export const getUtopianComments = (commentsList: UtopianCommentModel[], sitePreference: string) => {
  // Iterate over first array of objects
  return _.map(commentsList, (comment) => {
    if (sitePreference) {
      comment.url = comment.url.replace('steemit.com', sitePreference);
    }
    return comment;
  });
};

export const utopianPostsWithVoters = (utopianPosts: UtopianPostModel[], postsList: PostModel[], username: string) => {
  if (_.isEmpty(postsList)) {
    return [];
  }
  return _.map(utopianPosts, (post) => {
    const postObject = _.find(postsList, {permlink: post.permlink});
    if (postObject) {
      post.loading = false;
      if (_.has(postObject, 'error')) {
        post.error = true;
      } else {
        const activeVotes = _.map(_.get(postObject, 'active_votes', []), 'voter');
        if (username && _.indexOf(activeVotes, username) >= 0) {
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

export const utopianCommentsWithVoters = (utopianComments: UtopianCommentModel[], postsList: PostModel[], username: string) => {
  if (_.isEmpty(postsList)) {
    return [];
  }
  // Updating Moderator comment object with other information.
  return _.map(utopianComments, (comment) => {
    const postObject = _.find(postsList, {permlink: comment.permlink});
    if (postObject) {
      comment.loading = false;
      comment.total_payout = postObject.pending_payout_value;
      comment.total_votes = postObject.net_votes;
      const created = moment.utc(postObject.created);
      comment.duration = moment(created).fromNow();
      if (_.has(postObject, 'error')) {
        comment.error = true;
      } else {
        const activeVotes = _.map(_.get(postObject, 'active_votes', []), 'voter');
        if (username && _.indexOf(activeVotes, username) >= 0) {
          comment.hasUpvoted = true;
          comment.error = false;
        }
        if (postObject.author === username) {
          comment.isAuthor = true;
        }
      }
    }
    return comment;
  });
};

import {PostActions, PostActionTypes} from '../actions/post.actions';
import {PostModel} from '../models/post.model';
import {PostState} from './index';
import * as _ from 'lodash';
import * as moment from 'moment';
import {BidModel} from '../../bot/models/bid.model';

export function reducer(state, action: PostActions): PostModel[] {
  switch (action.type) {
    case PostActionTypes.RetrievePostDetailsSuccess: {
      return action.payload;
    }
    case PostActionTypes.RetrievePostsForUsersSuccess: {
      if (!state) {
        return action.payload;
      }
      return [...state, ...action.payload];
    }
    case PostActionTypes.ClearPostList: {
      return [];
    }
    default: {
      return state;
    }
  }
}

// Retrieve post list from state
export const getPostsList = (state: PostState) => _.get(state, 'list', '');

// Filter comments from all the current bids.
export const getPostsWithVotes = (postsList: PostModel[], commentList: BidModel[]) => {
  // Iterate over first array of objects
  return _.map(postsList, (obj) => {

    obj.body = _.truncate(obj.body, {
      'length': 75,
      'separator': /,? +/
    });
    // add the properties from second array matching the permlink
    // to the object from first array and return the updated object
    return _.assign(obj, _.find(commentList, {permlink: obj.permlink}));
  });
};

export const getOracleDPosts = (postsList: PostModel[], username: string) => {
  const posts = _.map(postsList, (post) => {
    const beneficiaries = _.map(post.beneficiaries, 'account');
    const activeVotes = _.map(post.active_votes, 'voter');

    const created = moment.utc(post.created);
    const duration = moment.duration(moment().diff(created));
    const timeSinceCreation = duration.asMinutes();

    if (beneficiaries.indexOf('oracle-d.pay') >= 0 && activeVotes.indexOf('oracle-d') < 0
      && post.last_payout.indexOf('1970') >= 0 && timeSinceCreation > 15) {
        post.total_votes = post.active_votes.length;
        post.total_payout = post.pending_payout_value;
        post.duration = moment(created).fromNow();
        if (username && activeVotes.indexOf(username) >= 0) {
          post.hasUpvoted = true;
          post.error = false;
        }
        return post;
    }
  });
  return _.without(posts, undefined);
};

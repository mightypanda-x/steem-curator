import {PostActions, PostActionTypes} from '../actions/post.actions';
import {PostModel} from '../models/post.model';
import {PostState} from './index';
import * as _ from 'lodash';
import {BidModel} from '../../bot/models/bid.model';

export function reducer(state, action: PostActions): PostModel[] {
  switch (action.type) {
    case PostActionTypes.RetrievePostDetailsSuccess: {
      return action.payload;
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

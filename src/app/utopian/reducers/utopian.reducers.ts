import {UtopianActions, UtopianActionTypes} from '../actions/utopian.actions';
import {UtopianPostModel} from '../models/utopian.model';

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

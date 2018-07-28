import {BidModel} from '../models/bid.model';
import {BotActions, BotActionTypes} from '../actions/bot.actions';
import {BotState} from './index';
import * as _ from 'lodash';

export const initialState: BidModel[] = [];

export function reducer(state = initialState, action: BotActions): BidModel[] {
  switch (action.type) {
    case BotActionTypes.RetrieveBotInformationSuccess: {
      return [
        ...action.payload
      ];
    }
    case BotActionTypes.ClearBotInformation: {
      return [];
    }
    default: {
      return state;
    }
  }
}

// Retrieve list from state
export const getBidsList = (state: BotState) => _.get(state, 'list', '');

// Filter comments from all the current bids.
export const getCommentBids = (bidList: BidModel[]) => {
  const commentList = _.map(bidList, (list) => {
    if (list.url.indexOf('#') >= -1) {
      return list;
    }
  });
  return _.without(commentList, undefined);
};


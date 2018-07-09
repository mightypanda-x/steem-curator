import {BidModel} from '../models/bid.model';
import {BotActions, BotActionTypes} from '../actions/bot.actions';
import {BotState} from './index';
import * as _ from 'lodash';

export const initialState: BidModel[] = [];

export function reducer(state = initialState, action: BotActions): BidModel[] {
  switch (action.type) {
    case BotActionTypes.RetriveBotInformationSuccess: {
      return [
        ...state,
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

export const getBidsList = (state: BotState) => _.get(state, 'list', '');
export const getCommentBids = (bidList: BidModel[]) => {
  const commentList = _.map(bidList, (list) => {
    if (list.url.indexOf('#') >= 0) {
      return list;
    }
  });
  return _.without(commentList, undefined);
};


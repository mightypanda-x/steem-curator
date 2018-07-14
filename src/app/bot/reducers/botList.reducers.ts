import {BotActions, BotActionTypes} from '../actions/bot.actions';
import {BotModel} from '../models/bot.model';
import {BotsListState} from './index';
import * as _ from 'lodash';

export function reducer(state, action: BotActions): BotModel[] {
  switch (action.type) {
    case BotActionTypes.RetrieveBotListSuccess: {
      return [
        ...action.payload
      ];
    }
    default: {
      return state;
    }
  }
}

// Retrieve list of bots from state
export const getBotsList = (state: BotsListState) => _.get(state, 'list', '');

// Filter bots based on if they upvote comments and minimum vote value of 1.5 USD. This will eliminate smaller bots from the race.
export const getCommentBots = (botList: BotModel[]) => {
  const commentBotList = _.map(botList, (list) => {
    if (list.comments && list.vote_usd > 1.5) {
      return _.pick(list, ['name']);
    }
  });
  const commentBots = _.without(commentBotList, undefined);
  return _.map(commentBots, 'name');
};

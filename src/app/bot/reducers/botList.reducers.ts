import {BotActions, BotActionTypes} from '../actions/bot.actions';
import {BotModel} from '../models/bot.model';

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

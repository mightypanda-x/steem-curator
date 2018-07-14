import * as fromBots from './bot.reducers';
import * as fromBotsList from './botList.reducers';
import {BidModel} from '../models/bid.model';
import {ActionReducerMap} from '@ngrx/store';
import {BotModel} from '../models/bot.model';

export interface BotState {
  list: BidModel[];
}

export interface BotsListState {
  list: BotModel[];
}

export const reducers: ActionReducerMap<BotState> = {
  list: fromBots.reducer
};

export const botsReducers: ActionReducerMap<BotsListState> = {
  list: fromBotsList.reducer
};

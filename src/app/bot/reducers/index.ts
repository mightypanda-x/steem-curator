import * as fromBots from './bot.reducers';
import {BidModel} from '../models/bid.model';
import {ActionReducerMap} from '@ngrx/store';

export interface BotState {
  list: BidModel[];
}

export const reducers: ActionReducerMap<BotState> = {
  list: fromBots.reducer
};

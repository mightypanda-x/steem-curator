import { createFeatureSelector, createSelector } from '@ngrx/store';
import {BotState} from '../reducers';
import * as fromBot from '../reducers/bot.reducers';

export const selectBids = createFeatureSelector<BotState>('bids');

export const getBidsList = createSelector(
  selectBids,
  fromBot.getBidsList
);

export const getCommentBids = createSelector(getBidsList, fromBot.getCommentBids);

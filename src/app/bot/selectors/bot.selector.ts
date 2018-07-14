import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BotsListState} from '../reducers';
import * as fromBot from '../reducers/botList.reducers';

export const selectBots = createFeatureSelector<BotsListState>('bots');

export const getBotsList = createSelector(
  selectBots,
  fromBot.getBotsList
);

export const getCommentSupportingBots = createSelector(getBotsList, fromBot.getCommentBots);

import {ActionReducerMap} from '@ngrx/store';
import * as fromUtopian from './utopian.reducers';
import {UtopianCommentModel, UtopianPostModel} from '../models/utopian.model';

export interface UtopianState {
  posts: UtopianPostModel[];
  comments: UtopianCommentModel[];
}

export const reducers: ActionReducerMap<UtopianState> = {
  posts: fromUtopian.reducer,
  comments: fromUtopian.modCommentReducer
};

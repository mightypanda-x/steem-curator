import {ActionReducerMap} from '@ngrx/store';
import * as fromUtopian from './utopian.reducers';
import {UtopianPostModel} from '../models/utopian.model';

export interface UtopianState {
  posts: UtopianPostModel[];
}

export const reducers: ActionReducerMap<UtopianState> = {
  posts: fromUtopian.reducer
};

import {ActionReducerMap} from '@ngrx/store';
import * as fromUtopian from './utopian.reducers';
import {UtopianPostModel} from '../models/utopian.model';

export interface UtopianState {
  pending: UtopianPostModel[];
}

export const reducers: ActionReducerMap<UtopianState> = {
  pending: fromUtopian.reducer
};

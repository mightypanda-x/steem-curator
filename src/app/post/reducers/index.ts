import {PostModel} from '../models/post.model';
import * as fromPosts from '../reducers/post.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface PostState {
  list: PostModel[];
}

export const reducers: ActionReducerMap<PostState> = {
  list: fromPosts.reducer
};

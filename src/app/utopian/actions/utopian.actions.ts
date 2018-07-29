import {Action} from '@ngrx/store';
import {UtopianPostModel} from '../models/utopian.model';

export enum UtopianActionTypes {
  RetrievePendingPosts = '[Utopian] Retrieve Pending Posts',
  RetrievePendingPostsSuccess = '[Utopian] Retrieve Pending Posts Success',
  RetrievePendingPostsFailure = '[Utopian] Retrieve Pending Posts Failure'
}

/*
* This action triggers the call to get utopian posts that are waiting a vote from utopian bot.
*/
export class RetrievePendingPosts implements Action {
  readonly type = UtopianActionTypes.RetrievePendingPosts;

  constructor() {}
}

/*
* This action will be called when data is successfully retrieved.
*/
export class RetrievePendingPostsSuccess implements Action {
  readonly type = UtopianActionTypes.RetrievePendingPostsSuccess;

  constructor(public payload: UtopianPostModel[]) { }
}

export class RetrievePendingPostsFailure implements Action {
  readonly type = UtopianActionTypes.RetrievePendingPostsFailure;

  constructor(public payload: string) {}
}

export type UtopianActions = RetrievePendingPosts
  | RetrievePendingPostsSuccess
  | RetrievePendingPostsFailure;

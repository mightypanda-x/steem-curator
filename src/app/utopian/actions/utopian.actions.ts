import {Action} from '@ngrx/store';
import {UtopianCommentModel, UtopianPostModel} from '../models/utopian.model';

export enum UtopianActionTypes {
  RetrievePendingPosts = '[Utopian] Retrieve Pending Posts',
  RetrieveUnreviewedPosts = '[Utopian] Retrieve Unreviewed Posts',
  RetrievePendingPostsSuccess = '[Utopian] Retrieve Pending Posts Success',
  RetrievePendingPostsFailure = '[Utopian] Retrieve Pending Posts Failure',
  RetrieveModComments = '[Utopian] Retrieve Moderator Comments',
  RetrieveModCommentsSuccess = '[Utopian] Retrieve Moderator Comments Success',
  RetrieveModCommentsFailure = '[Utopian] Retrieve Moderator Comments Failure',
}

/*
* This action triggers the call to get utopian posts that are waiting a vote from utopian bot.
*/
export class RetrievePendingPosts implements Action {
  readonly type = UtopianActionTypes.RetrievePendingPosts;

  constructor() {}
}

export class RetrieveUnreviewedPosts implements Action {
  readonly type = UtopianActionTypes.RetrieveUnreviewedPosts;

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

export class RetrieveModComments implements Action {
  readonly type = UtopianActionTypes.RetrieveModComments;

  constructor() {}
}

export class RetrieveModCommentsSuccess implements Action {
  readonly type = UtopianActionTypes.RetrieveModCommentsSuccess;

  constructor(public payload: UtopianCommentModel[]) {}
}

export class RetrieveModCommentsFailure implements Action {
  readonly type = UtopianActionTypes.RetrieveModCommentsFailure;

  constructor() {}
}

export type UtopianActions = RetrievePendingPosts
  | RetrievePendingPostsSuccess
  | RetrievePendingPostsFailure
  | RetrieveModComments
  | RetrieveModCommentsSuccess
  | RetrieveModCommentsFailure;

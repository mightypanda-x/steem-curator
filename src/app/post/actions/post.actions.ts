import { Action } from '@ngrx/store';
import {BidModel} from '../../bot/models/bid.model';
import {PostModel} from '../models/post.model';

export enum PostActionTypes {
  RetrievePostDetails = '[Post] Retrieve Details',
  RetrievePostDetailsSuccess = '[Post] Retrieve Details Success',
  RetrievePostDetailsFailure = '[Post] Retrieve Details Failure',
}
/*
* This action triggers the call to get post details.
*/
export class RetrievePostDetails implements Action {
  readonly type = PostActionTypes.RetrievePostDetails;

  constructor(public payload: BidModel[]) {}
}
/*
* This action gets called when the retrieve of post data is successful.
*/
export class RetrievePostDetailsSuccess implements Action {
  readonly type = PostActionTypes.RetrievePostDetailsSuccess;

  constructor(public payload: PostModel[]) {}
}

export class RetrievePostDetailsFailure implements Action {
  readonly type = PostActionTypes.RetrievePostDetailsFailure;

  constructor(public payload: string) {}
}

export type PostActions = RetrievePostDetails
  | RetrievePostDetailsSuccess
  | RetrievePostDetailsFailure;

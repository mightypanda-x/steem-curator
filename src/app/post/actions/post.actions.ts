import { Action } from '@ngrx/store';
import {BidModel} from '../../bot/models/bid.model';
import {PostModel} from '../models/post.model';
import {UtopianCommentModel, UtopianPostModel} from '../../utopian/models/utopian.model';

export enum PostActionTypes {
  RetrievePostDetails = '[Post] Retrieve Details',
  RetrievePostDetailsSuccess = '[Post] Retrieve Details Success',
  RetrievePostDetailsFailure = '[Post] Retrieve Details Failure',
  RetrievePostsForUsers = '[Post] Retrieve Posts for multiple users',
  RetrievePostsForUsersSuccess = '[Post] Retrieve Posts for multiple users success',
  ClearPostList = '[Post] Clear State'
}
/*
* This action triggers the call to get post details.
*/
export class RetrievePostDetails implements Action {
  readonly type = PostActionTypes.RetrievePostDetails;

  constructor(public payload: BidModel[] | UtopianPostModel[] | UtopianCommentModel[]) {}
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

export class RetrievePostsForUsers implements Action {
  readonly type = PostActionTypes.RetrievePostsForUsers;

  constructor(public payload: string[]) {}
}

export class RetrievePostsForUsersSuccess implements Action {
  readonly type = PostActionTypes.RetrievePostsForUsersSuccess;

  constructor(public payload: PostModel[]) {}
}

/*
* This action clears the state object before getting a fresh list of all the posts.
 */
export class ClearPostList implements Action {
  readonly type = PostActionTypes.ClearPostList;
}

export type PostActions = RetrievePostDetails
  | RetrievePostDetailsSuccess
  | RetrievePostDetailsFailure
  | RetrievePostsForUsers
  | RetrievePostsForUsersSuccess
  | ClearPostList;

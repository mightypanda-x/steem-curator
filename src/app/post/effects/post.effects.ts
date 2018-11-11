import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {PostService} from '../services/post.service';
import {catchError, switchMap} from 'rxjs/internal/operators';
import {
  PostActionTypes,
  RetrievePostDetails,
  RetrievePostDetailsSuccess,
  RetrievePostsForUsers,
  RetrievePostsForUsersSuccess
} from '../actions/post.actions';
import {PostState} from '../reducers';
import {Store} from '@ngrx/store';
import {PostModel} from '../models/post.model';

@Injectable()
export class PostEffects {
  /*
  * This effect intercepts RetrieveBotInformation action and calls the service.
  */
  @Effect()
  getPostDetails = this.actions.pipe(
    ofType(PostActionTypes.RetrievePostDetails),
    switchMap((action: RetrievePostDetails) => this.postService.retrivePostsInfo(action.payload, (err, postList: PostModel[]) => {
      if (err) {
        catchError(error => this.postService.handleError(error));
      }
      if (postList.length > 0) {
        this.store.dispatch(new RetrievePostDetailsSuccess(postList));
      }
    }))
  );

  @Effect()
  getPostsForUsers = this.actions.pipe(
    ofType(PostActionTypes.RetrievePostsForUsers),
    switchMap((action: RetrievePostsForUsers) => this.postService.retrievePostsForUsers(action.payload, (err, postsList) => {
      if (err) {
        catchError(error => this.postService.handlePostRetrieveError(err));
      }
      if (postsList.length > 0) {
        this.store.dispatch(new RetrievePostsForUsersSuccess(postsList));
      }
    }))
  );
  constructor(
    private actions: Actions,
    private store: Store<PostState>,
    private postService: PostService
  ) {}
}

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {RetrievePendingPosts, RetrievePendingPostsSuccess, UtopianActionTypes} from '../actions/utopian.actions';
import {UtopianService} from '../services/utopian.service';

@Injectable()
export class UtopianEffects {
  /*
  * This effect intercepts RetrieveBotInformation action and calls the service.
   */
  @Effect()
  getPendingPost = this.actions.pipe(
    ofType(UtopianActionTypes.RetrievePendingPosts),
    switchMap(() => this.utopianService.retrievePendingPosts().pipe(
      catchError(error => this.utopianService.handleError(error)),
      map((pendingPosts: any) => new RetrievePendingPostsSuccess(pendingPosts))
    ))
  );

  @Effect()
  getUnreviewedPost = this.actions.pipe(
    ofType(UtopianActionTypes.RetrieveUnreviewedPosts),
    switchMap(() => this.utopianService.retrieveUnreviewedPosts().pipe(
      catchError(error => this.utopianService.handleError(error)),
      map((pendingPosts: any) => new RetrievePendingPostsSuccess(pendingPosts))
    ))
  );

  constructor(
    private actions: Actions,
    private utopianService: UtopianService
  ) {}
}

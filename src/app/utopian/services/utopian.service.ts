import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {UtopianCommentModel, UtopianPostModel} from '../models/utopian.model';
import {RetrievePendingPostsFailure} from '../actions/utopian.actions';

@Injectable()
export class UtopianService {
  private apiUrl = 'https://utopian.rocks/api/posts?status=';
  private modCommentUrl = 'https://auto-upvote.herokuapp.com/utopian/comments';
  constructor(private http: HttpClient, private store: Store<UtopianPostModel>) {}
  /*
  * This method will make a call to utopian service to get a list of pending posts.
  * */
  public retrievePendingPosts(): Observable<UtopianPostModel[]> {
    return this.http
      .get<any>(`${this.apiUrl}pending`,
        {responseType: 'json'});
  }

  public retrieveUnreviewedPosts(): Observable<UtopianPostModel[]> {
    return this.http
      .get<any>(`${this.apiUrl}unreviewed`,
        {responseType: 'json'});
  }
  // http call to get utopian mod comments. Backend code is deployed in a blackbox.
  public retrieveModeratorComments(): Observable<UtopianCommentModel[]> {
    return this.http
      .get<any>(`${this.modCommentUrl}`,
        {responseType: 'json'});
  }
  public handleError(error: HttpErrorResponse): Observable<UtopianPostModel> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status !== 200) {
      this.store.dispatch(new RetrievePendingPostsFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Fetch Error: ${JSON.stringify(error, null, 2)}`);
  }
}

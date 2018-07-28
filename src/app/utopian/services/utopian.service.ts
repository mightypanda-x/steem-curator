import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {UtopianPostModel} from '../models/utopian.model';
import {RetrievePendingPostsFailure} from '../actions/utopian.actions';

@Injectable()
export class UtopianService {
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = 'https://utopian.rocks/api';
  constructor(private http: HttpClient, private store: Store<UtopianPostModel>) {}
  /*
  * This method will make a call to utopian service to get a list of pending posts.
  * */
  public retrivePendingPosts(): Observable<UtopianPostModel[]> {
    return this.http
      .get<any>(`${this.proxyUrl}${this.apiUrl}/posts?status=pending`,
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

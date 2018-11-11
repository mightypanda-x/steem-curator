import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import * as steem from 'steem';
import {BidModel} from '../../bot/models/bid.model';
import {RetrievePostDetailsFailure} from '../actions/post.actions';
import {UtopianCommentModel, UtopianPostModel} from '../../utopian/models/utopian.model';
import * as moment from 'moment';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private store: Store<BidModel>) {}

  public retrivePostsInfo(bids: BidModel[] | UtopianPostModel[] | UtopianCommentModel[], cb): Array<any> {
    const methodCalls = [];
    _.map(bids, (bid) => {
      methodCalls.push(this.getPostInformation(bid.author, bid.permlink));
    });
    Promise.all(
      methodCalls
    ).then((results) => {
      cb(null, results);
    });
    return [];
  }
  /*
  * This method gets post information using steem api and then promisefies the response.
  * This is essential so we can make all the calls and then bundle that response using Promise.all
  */
  private getPostInformation(author, permlink): Promise<any> {
    return new Promise((resolve) => {
      steem.api.getContent(author, permlink, (err, postInformation) => {
        if (err) {
          console.log('Error', err);
          resolve({
            author,
            permlink,
            error: true
          });
        } else {
          resolve(postInformation);
        }
      });
    });
  }
  public retrievePostsForUsers(authorList: string[], cb): Array<any> {
    const methodCalls = [];
    _.map(authorList, (author) => {
      methodCalls.push(this.getPostsForUser(author));
    });
    Promise.all(methodCalls)
      .then((results) => {
        let posts = [];
        _.map(results, (list) => {
          posts = [...posts, ...list];
        });
        cb(null, posts);
      });
    return [];
  }
  /*
  * This method gets posts for a user using steem api and then promisefies the response.
  * This is essential so we can make all the calls and then bundle that response using Promise.all
  */
  private getPostsForUser(author: string): Promise<any> {
    const formattedDate = moment().format('YYYY-MM-DD\T\HH:MM:ss');
    return new Promise((resolve) => {
      steem.api.getDiscussionsByAuthorBeforeDate(author, '', formattedDate, 5, function(err, posts) {
        if (err) {
          resolve({
            author,
            error: true
          });
        } else {
          resolve(posts);
        }
      });
    });
  }
  public handlePostRetrieveError(error: HttpErrorResponse): Observable<any> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }
  public handleError(error: HttpErrorResponse): Observable<BidModel> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetrievePostDetailsFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }
}

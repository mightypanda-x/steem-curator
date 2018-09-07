import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EMPTY, from, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import * as steem from 'steem';
import {BidModel} from '../../bot/models/bid.model';
import {RetrievePostDetailsFailure} from '../actions/post.actions';
import {PostModel} from '../models/post.model';
import {UtopianPostModel} from '../../utopian/models/utopian.model';

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private store: Store<BidModel>) {}

  public retrivePostsInfo(bids: BidModel[] | UtopianPostModel[], cb): Array<any> {
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
    return new Promise((resolve, reject) => {
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
  public handleError(error: HttpErrorResponse): Observable<BidModel> {
    console.log(`Error: ${JSON.stringify(error, null, 2)}`);
    if (error.status === 401) {
      this.store.dispatch(new RetrievePostDetailsFailure(error.message));
      return EMPTY;
    }
    throw new Error(`Auth Error: ${JSON.stringify(error, null, 2)}`);
  }
}

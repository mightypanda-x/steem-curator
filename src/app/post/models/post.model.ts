import {BidModel} from '../../bot/models/bid.model';

export interface PostModel extends BidModel{
  net_votes: number;
  pending_payout_value: string;
  permlink: string;
  body: string;
}


export interface UtopianPostModel {
  author: string;
  category: string;
  created: Date;
  title: string;
  total_payout: number;
  total_votes: number;
  url: string;
  hasUpvoted: boolean;
  loading: boolean;
  error: boolean;
  isAuthor: boolean;
}

export interface UtopianCommentModel {
  author: string;
  permlink: string;
  url: string;
  loading: boolean;
  total_payout: number;
  total_votes: number;
}

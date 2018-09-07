
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

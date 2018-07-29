import { NextFunction, Request, Response } from 'express';
import * as fromUtopianService from './service';
import * as _ from 'lodash';

export function retrievePending(req: Request, res: Response, next: NextFunction): void {
  fromUtopianService.retrievePendingPosts(_.get(req, 'user.accessToken', ''))
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch(error => next(error));
}

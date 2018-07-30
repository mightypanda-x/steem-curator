import { Router } from 'express';
import * as controller from './controller';

export function RegisterProjectRoutes(router: Router): void {
  router.get('/api/utopian/pending', controller.retrievePending);
}

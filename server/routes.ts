import {Application, Router} from 'express';
import * as Utopian from './api/utopian';

export function registerRoutes(router: Router, app: Application): Router {
  // Register API Routes
  Utopian.RegisterProjectRoutes(router);
  return router;
}

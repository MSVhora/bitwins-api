import { Application } from 'express';
import { v1Router } from './v1'
import { ROUTE_PREFIX_V1 } from '../utils/constants';

export default (app: Application) => {
    app.use(`${ROUTE_PREFIX_V1}`, v1Router)
};
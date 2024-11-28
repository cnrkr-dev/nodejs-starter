/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import helmet from 'helmet';
import { default as AllRoutes } from '../../../common/global-router';
import {
    NotFoundHandler,
  } from '../../../common/shared';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); // Prevent the app from being displayed in an iframe
app.use(helmet.xssFilter()); // Protect against XSS attacks
app.use(helmet.noSniff()); // Prevent MIME type sniffing
app.use(helmet.ieNoOpen());
app.use(express.json());
app.disable('x-powered-by'); // Disable X-Powered-By header

app.use('/api/v1', AllRoutes);

app.use(NotFoundHandler);

export default app;

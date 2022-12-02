import path from 'path';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { SERVERPORT } from './config/config';
import logger from './middleware/logger.module';
import { rateLimit } from 'express-rate-limit';
import db from './database/database';
import mainRoute from './handlers/index.handler';

export const app: Application = express();

app.use(bodyParser.json());
// app.use(logger);
app.use(
  rateLimit({
    windowMs: 11 * 60 * 1000, // Limit the request window to 11 minutes per IP address
    max: 50, // Allow each IP address to make 50 requests per window (i.e. per 11 minutes, in our case)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:
      'Too many requests were made from your IP Address in such a short window of time...Please try again after 11 minutes',
  })
);

// db.connect().then((client: any) => {
//   return client.query('SELECT NOW()').then((res: { rows: any }) => {
//     client.release();
//     console.log(res.rows);
//   });
// });

app.get('/', function (req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, '../assets/pages/index.html'));
});

app.use('/storebackend/api', mainRoute);

app.listen(SERVERPORT, function () {
  console.log(`server is running on port ${SERVERPORT}...`);
});

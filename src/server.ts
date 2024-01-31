import express, { Application } from 'express';
import { router as tests } from './routers/tests.js';
import { router as test } from './routers/test.js';

export const PORT : number = 1266;
export const ADDRESS : string = '0.0.0.0';
const serv : Application = express();

serv.use(express.urlencoded());
serv.use('/', express.static(__dirname + '/../ui/dist/ui/browser/'));
serv.use('/api/tests', tests);
serv.use('/api/test', test);

serv.listen(PORT, ADDRESS, () => console.log('Server started successfully!'));

// @flow

import 'module-alias/register';

import App from './app';
import Authentication from './auth/auth';
import AuthRouter from './auth/auth.router';
import Database from './db/database';
import DatabaseRouter from './db/database.router';

const app = new App({ port: 8080 });
const auth = new Authentication();
const database = new Database();

app.registerPassport(auth);

const authRouter = new AuthRouter(auth, database);
const dbRouter = new DatabaseRouter(database);

app.registerRouter('/api/db', dbRouter.getRouter());
app.registerRouter('/api/auth', authRouter.getRouter());

app.start();

// @flow

import 'module-alias/register';

import App from 'server/app';
import Authentication from 'server/auth/auth';
import AuthRouter from 'server/auth/auth.router';
import componentRouter from 'server/component/component.router';
import Database from 'server/db/database';
import DatabaseRouter from 'server/db/database.router';

const app = new App({ port: 8080 });
const auth = new Authentication();
const database = new Database();

app.registerPassport(auth);

const authRouter = new AuthRouter(auth, database);
const dbRouter = new DatabaseRouter(database);

app.registerRouter('/api/db', dbRouter.getRouter());
app.registerRouter('/api/auth', authRouter.getRouter());
app.registerRouter('/api/component', componentRouter());

app.start();

import App from './app';
import Database from './db/database';
import Authentication from './auth/auth';
import DatabaseRouter from './db/database.router';
import AuthRouter from './auth/auth.router';

const app = new App({ port: 8080 });
const database = new Database();
const auth = new Authentication(database);

app.registerPassport(auth.getPassport());
auth.initialize();

const authRouter = new AuthRouter(auth, database);
const dbRouter = new DatabaseRouter(database);

app.registerRouter('/api/db', dbRouter.getRouter());
app.registerRouter('/api/auth', authRouter.getRouter());

app.start();

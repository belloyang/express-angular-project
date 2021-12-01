/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import * as express from "express";
 import * as apiRouter from './routes/api';
 import * as path from 'path';
/**
 * App Variables
 */
 dotenv.config({
    path: path.join(__dirname, '.env')
  });
 if (!process.env.PORT) {
   process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);

 const app = express();
 app.use(express.static(path.join(__dirname, '../dist/my-angular-express-project')));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
/**
 *  App Configuration
 */
 const ads = [
    {title: 'Hello, world!'}
  ];
/**
 * Server Activation
 */
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

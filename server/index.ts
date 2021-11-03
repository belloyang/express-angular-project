/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import * as express from "express";
/**
 * App Variables
 */
 dotenv.config();
 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);

 const app = express();
/**
 *  App Configuration
 */

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
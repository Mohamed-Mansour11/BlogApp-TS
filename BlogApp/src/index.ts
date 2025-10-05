import express from 'express';
import { config } from 'dotenv';
import path from 'node:path';
import { bootstrap } from './app.controller';


// Load environment variables from .env.dev file

config({ path: path.resolve(__dirname, '../.env.dev') });

const app: express.Application = express();
const port: string | number = process.env.PORT || 5000;

bootstrap(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config({ path: './.env' });
}

import app from './src/app.js';

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// const DB = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

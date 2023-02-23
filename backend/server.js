import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import app from './src/app.js';

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// const DB =
//   'mongodb://thesis:lplsxlAykVxLYM3PUX46fowYontnyM48zUsPmQlmwBHKLlADmg3E7shh4mRn48dxb36jaiZRc61ZACDbUBONxA==@thesis.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@thesis@';

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

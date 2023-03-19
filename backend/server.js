import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import Turn from './src/models/turnModel.js';
if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config({ path: './.env' });
}

import app from './src/app.js';

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connected');

  console.log('Setting change streams');
  const turnChangeStream = connection.collection('turns').watch();

  turnChangeStream.on('change', async (change) => {
    switch (change.operationType) {
      case 'insert':
        const id = change.fullDocument._id;

        const temp = async (id, popOptions) => {
          let query = Turn.findById(id);
          if (popOptions) query = query.populate(popOptions);
          const doc = await query;
          return doc;
        };

        const result = await temp(id, 'person');

        const turn = {
          _id: change.fullDocument._id,
          person: result.person,
          building: change.fullDocument.building,
          time: change.fullDocument.time,
          isMasked: change.fullDocument.isMasked,
          images: change.fullDocument.images || [],
        };

        io.of('/api/socket').emit('newTurn', turn);
        break;

      case 'delete':
        io.of('/api/socket').emit('deleteTurn', change.documentKey._id);
        break;
    }
  });
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.of('/api/socket').on('connection', (socket) => {
  console.log('socket.io: User connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('socket.io: User disconnected: ', socket.id);
  });
});

connection.on('error', (error) => console.log('Error: ' + error));

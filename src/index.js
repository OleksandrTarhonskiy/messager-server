import express from 'express';
import { Server } from 'socket.io';

import { CLIENT, SERVER } from './helpers/events.js';

const PORT = 8080;
const OPTIONS={
  cors:true,
  origins:['http://127.0.0.1:3000'],
 };
 const messages = [];

const app = express();
const server = app.listen(PORT, () => console.log('server is running on ' + PORT));
const io = new Server(server, OPTIONS);

io.on('connection', socket => {
	console.log('New user connected')

	socket.username = "Anonymous"

    // socket.on('change_username', (data) => {
    //     socket.username = data.username
    // })

  socket.on(CLIENT.SEND_MESSAGE, (data) => {
    console.log(data)
    socket.broadcast.emit(SERVER.SEND_MESSAGE, data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit(
      'typing', 
      {username : socket.username}
    );
  });
})
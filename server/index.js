const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
      cors: {
            origin: "http://127.0.0.1:5173",
            methods: ["GET", "POST"],
      },
});

io.on("disconnect", (socket) => {
    console.log("User disconnected: " + socket.id);
  });

io.on('connection', (socket) => {
      socket.on("join_room", (payload, callback) => {

            let numberOfUsersInRoom = getUsersInRoom(payload).length

        const playerName = () => {
            if(numberOfUsersInRoom==0){
                return 'Player 1'
            }
            if(numberOfUsersInRoom==1){
                return 'Player 2'
            }
            if(numberOfUsersInRoom==2){
                return 'Player 3'
            }
            else{
                return 'Player 4'
            }
        }


            console.log("payload: " + payload)

            const {error, newUser } = addUser({
                id: socket.id,
                name: playerName(),
                room: payload
            })

            console.log(newUser)

            if(error){
                  return callback(error)
            }
        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
        socket.emit('currentUserData', {name: newUser.name})

        console.log(`User Connected: ${socket.id}` + " to " + newUser.room);


      })

      socket.on('initGameState', gameState => {
            const user = getUser(socket.id)
            if(user)
                io.to(user.room).emit('initGameState', gameState)
        })

        socket.on('updateGameState', gameState => {
            const user = getUser(socket.id)
            if(user)
                io.to(user.room).emit('updateGameState', gameState)
        })

})


server.listen(3001, () => {
      console.log("SERVER IS RUNNING");
})

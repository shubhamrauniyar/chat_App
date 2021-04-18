
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static('Public'));
const io = require('socket.io')(server);
const getVisitors=(id)=>
{

const c=io.sockets.sockets.values();
const l=[...c];
console.log(l[1]);



}
function emitVisitor(id)
{
  io.emit("visitors",getVisitors(id));
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('a user connected');
  socket.on("new_visitor",(user)=>{
    socket.user=user;
    console.log("new user is added "+user);
    emitVisitor(socket.id);
  })
  socket.on("disconnect",()=>{
    console.log("user disconnected");
  })
});

server.listen(3000 || process.env.PORT, () => {
  console.log('listening on *:3000');
});

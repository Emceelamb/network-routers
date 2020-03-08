const express = require('express')
const app    = express();
const server = require('http').createServer(app);
const io     = require('socket.io')(server);
const path   = require('path');
const spawn  = require('child_process').spawn;

const PORT = process.env.PORT ||8000;

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Connection was made!')
  var address = socket.handshake.address;
  io.emit('server response', `${address}`)

  console.log("We have a new client: " + socket.id);
  // When this user emits, client side: socket.emit('otherevent',some data);
  socket.on('chatmessage', function (data) {
 // Data comes in as whatever was sent, including objects
  console.log("Received: 'chatmessage' " + data);
  
// Send it to all of the clients
  socket.broadcast.emit('chatmessage', data);
  })
});

io.on('disconnect', ()=>{
  console.log('Disconnected!')
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(PORT, ()=>{
  console.log(`Listening on ${PORT}`)
})

let sniff = spawn('tshark', [ '-i', 'wlan0', '-Y', '!tcp.port==8000',  '-l', '-T', 'fields', '-e', 'dns.qry.name', '-e', 'ip.src', '-e', 'ip.dst', '-e', 'tcp.port']);
//let sniff = spawn('tshark', [ '-i wlan0 -l']);
//let sniff = spawn('tshark', [ '-i wlan0 && tcp.port != 8000 -l']);
//let sniff = spawn('tshark', [ '-i', 'wlan0', '-Y', '!tcp.port==8000',  '-l']);

sniff.stdout.setEncoding('utf-8');
sniff.stdout.on('data', function (data) {
  io.emit('packet capture', data);
});

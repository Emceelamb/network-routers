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
  io.emit('server response', 'you connected')

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

//let sniff = spawn('tshark', [ '-i', 'wlan0', '-Y', '!tcp.port==8000',  '-l']);
let sniff = spawn('tshark', [ '-i', 'wlan0', '-Y', '!tcp.port==8000',  '-l', '-T', 'fields', '-e', 'dns.qry.name', '-e', 'ip.src', '-e', 'ip.dst', '-e', 'tcp.port']);
//let sniff = spawn('tshark', [ '-i wlan0 -l']);
//let sniff = spawn('tshark', [ '-i wlan0 && tcp.port != 8000 -l']);

sniff.stdout.setEncoding('utf-8');
sniff.stdout.on('data', function (data) {
  console.log(data)
  io.emit('packet capture', data);
});

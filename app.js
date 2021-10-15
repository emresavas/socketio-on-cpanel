var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
log_file.write(util.format(d) + '\n');
log_stdout.write(util.format(d) + '\n');
};

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
socket.on('chat message', (msg) => {
console.log(msg);
io.emit('chat message', msg);
});
});

http.listen(3000, () => {
console.log('listening on *:3000');
});

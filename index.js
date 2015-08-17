
/**
 * Nodejs Server
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
// current Value variable
var currentValue = '';
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html', 'utf8', function(err, data){
        res.end(data);
    })
});
io.on('connection', function(socket){
    console.log('User connected');
    // show user current value of redactor
    io.emit('textchanged', currentValue);
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
    socket.on('textchanged', function(text){
        console.log(text);
        io.emit('textchanged', text);
        // save new current value
        currentValue = text;
    })
});



http.listen(3000, function(){
    console.log('Server is on *:3000');
})
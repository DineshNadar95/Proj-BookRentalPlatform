const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const ImageController = require('./controller/imageController');

//routers
var mybookRouter = require('./routes/myBook_routes');
var myuserRouter = require('./routes/myUser_routes')

const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());
app.post('/api/uploadImages', ImageController.uploadImageToS3);

mongoose.connect('mongodb://127.0.0.1:27017/Table', { useNewUrlParser: true });
const connection = mongoose.connection;
mongoose.set('useFindAndModify', false);

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//routes
app.use('/mybook',mybookRouter)
app.use('/user',myuserRouter)

// app.get('/', function (req, res) {
//     res.sendFile('/chat');
//   });
  
//   io.on('connection', function (socket) {
//     socket.on('user_join', function (data) {
//       this.username = data;
//       socket.broadcast.emit('user_join', data);
//     });
  
//     socket.on('chat_message', function (data) {
//       data.username = this.username;
//       socket.broadcast.emit('chat_message', data);
//     });
  
//     socket.on('disconnect', function (data) {
//       socket.broadcast.emit('user_leave', this.username);
//     });
//   });
  

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
// http.listen(PORT, function () {
//     console.log('Listening on *:' + port);
//   });
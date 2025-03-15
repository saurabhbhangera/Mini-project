const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: "http://localhost:4200", credentials: true }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:4200", methods: ["GET", "POST"] }
});

let posts = [
    { id: 1, content: "Hello World!", likes: 5, comments: ["Nice post!", "I agree!"] },
    { id: 2, content: "This is a cool app!", likes: 3, comments: [] }
];

io.on('connection', (socket) => {
    console.log('✅ A user connected');
    socket.emit('feed', posts);

    socket.on('newPost', (post) => {
        posts.push(post);
        io.emit('feed', posts);
    });

    socket.on('likePost', (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            io.emit('feed', posts);
        }
    });

    socket.on('commentOnPost', (commentData) => {
        const post = posts.find(p => p.id === commentData.postId);
        if (post) {
            post.comments.push(commentData.comment);
            io.emit('feed', posts);
        }
    });

    socket.on('disconnect', () => {
        console.log('❌ A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('✅ Server running on port 3000');
});
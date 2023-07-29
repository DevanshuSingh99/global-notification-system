const { Server } = require("socket.io");
const socketIo = {};
const jwt = require("jsonwebtoken");
var io;
socketIo.users = {};
socketIo.connect = (server) => {
    io = new Server(server, { cors: { origin: "*" } });

    io.use((socket, next) => {
        jwt.verify(socket.handshake.query.token, 'Secret', (err, decodedPayload) => {
            if (err) {
                socket.disconnect();
            } else {
                socket.handshake.query.user = decodedPayload;
                next();
            }
        });
    });

    io.on("connection", function (socket) {
        socketIo.users[socket.handshake.query.user._id] = socket.id;
        if(socket.handshake.query.user.role === "User"){
            socket.join("user");
        }
        socket.on("disconnect", function () {
            delete socketIo.users[socket.handshake.query.user._id];
        });
    });
};

socketIo.broadcastMessageToUsers = (sendMessageName, message) => {
    return new Promise((resolve, reject) => {
        io.in("user").emit(sendMessageName, message);
        resolve();
    });
};
module.exports = socketIo;

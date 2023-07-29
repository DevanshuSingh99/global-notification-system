const app = require("express")();
const bodyParser = require("body-parser");
const { createServer } = require("node:http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("./models/socketIoModel.js");
var PORT = 3000;
var mongoUri = "";
const server = createServer(app);

mongoose
    .connect(mongoUri)
    .then((mongoRes) => {
        console.log("DB Connected");
    })
    .catch((mongoErr) => {
        console.log("DB Connection Failed");
    });

socketIo.connect(server)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", require("./routes/userRouter.js"));
app.use("/post", require("./routes/postRouter.js"));

server.listen(PORT, () => {
    console.log("Server started");
});

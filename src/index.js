import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/docs', (req, res) => {
    res.send('docs...');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
/*import express from 'express';

//const express=require("express")
const app = express();
const PORT = process.env.PORT || 3000;

//const path=require("path")
//const http=require("http")
//const {Server}=require("socket.io")


//const server=http.createServer(app)

//const io=new Server(server)
//app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]

/*io.on("connection", (socket) => {
    // On new player connecting, send them the current state
    socket.on("find", (e) => {
        if (e.name != null) {
            arr.push(e.name);

            if (arr.length >= 2) {
                let p1obj = {
                    p1name: arr[0],
                    p1value: "X",
                    p1move: ""
                };
                let p2obj = {
                    p2name: arr[1],
                    p2value: "O",
                    p2move: ""
                };

                let obj = {
                    p1: p1obj,
                    p2: p2obj,
                    sum: 0
                };
                playingArray.push(obj);
                arr.splice(0, 2);

                io.emit("find", { allPlayers: playingArray });
            }
        }
    });

    socket.on("playing", (e) => {
        let objToChange;
        if (e.value === "X") {
            objToChange = playingArray.find(obj => obj.p1.p1name === e.name);
            objToChange.p1.p1move = e.id;
        } else if (e.value === "O") {
            objToChange = playingArray.find(obj => obj.p2.p2name === e.name);
            objToChange.p2.p2move = e.id;
        }

        objToChange.sum++;
        io.emit("playing", { allPlayers: playingArray });
    });

app.get('/docs', (req, res) => {
    res.send('docs...');
});


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
*/
const express= require("express");  //access
const nodemon = require("nodemon");
const socket=require("socket.io");
const app = express();//initialization & server ready
app.use(express.static("public"));
let port=5000;
let server=app.listen(port,()=>{
    console.log("listening to port"+port);
})
let io=socket(server);
io.on("connection",(socket)=>{
    console.log("made socket connection");
    socket.on("beginPath",(data)=>{
        //transfer data from server to all component
        io.sockets.emit("beginPath",data);
    })
    socket.on("drawStroke",(data)=>{
        //transfer data from server to all component
        io.sockets.emit("drawStroke",data);
    })
     socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",data);
     })    
})


let canvas=document.querySelector("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
let tools=canvas.getContext("2d");
let pencilWidthElem=document.querySelector(".pencil-Width");
let pencilColor=document.querySelectorAll(".pencil-color");
let eraserWidthElem=document.querySelector(".eraser-Width");
let download=document.querySelector(".download");
let undo=document.querySelector(".undo");
let redo=document.querySelector(".redo");
let penColor="red";
let penWidth=pencilWidthElem.value;
let eraserColor="white";
let eraserWidth=eraserWidthElem.value;
let undoRedoTracker=[];
let track=0;
tools.strokeStyle=penColor;
tools.lineWidth=penWidth;

let mousedown=false;
canvas.addEventListener("mousedown",(e)=>{
    mousedown=true;
    // beginPath({                       //function calling by passing object as a parameter
    //     x:e.clientX,
    //     y:e.clientY
    // });
    let data={
        x:e.clientX,
       y:e.clientY
    }//transfer data to front-end to server
    socket.emit("beginPath",data);
})
canvas.addEventListener("mousemove",(e)=>{
    if(mousedown){
        let data={
            x:e.clientX,
            y:e.clientY,
            color:eraserFlag ? eraserColor:penColor,
            width:eraserFlag ? eraserWidth:penWidth
        }
        socket.emit("drawStroke",data);//data send to server
    //     drawStroke({        //function calling by passing object as a parameter
    //     x:e.clientX,
    //     y:e.clientY
    // });
}
})
canvas.addEventListener("mouseup",(e)=>{
    mousedown=false;
    let url=canvas.toDataURL();
    undoRedoTracker.push(url);
    track=undoRedoTracker.length-1;
})
undo.addEventListener("click",(e)=>{
if(track>0)track--;
data={
    trackValue:track,
    undoRedoTracker
}
//undoRedoCanvas(trackObj);
socket.emit("redoUndo",data);
})
redo.addEventListener("click",(e)=>{
if(track<undoRedoTracker.length)track++;
data={
    trackValue:track,
    undoRedoTracker
}
//undoRedoCanvas(trackObj);
socket.emit("redoUndo",data);
})

function undoRedoCanvas(trackObj){
    let track=trackObj.trackValue;
    let undoRedoTracker=trackObj.undoRedoTracker;
    let url=undoRedoTracker[track];
    let img=new Image;
    img.src=url;
    img.onload=(e)=>{
        tools.drawImage(img,0,0,canvas.width,canvas.height);
    }
}

function beginPath(strokeObj){
tools.beginPath();
tools.moveTo(strokeObj.x,strokeObj.y);
}
function drawStroke(strokeObj){
    tools.strokeStyle=strokeObj.color;
    tools.lineWidth=strokeObj.width;
    tools.lineTo(strokeObj.x,strokeObj.y);
    tools.stroke();

}
pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color=colorElem.classList[0];
        penColor=color;
        tools.strokeStyle=penColor;
    })
   
})
pencilWidthElem.addEventListener("change",(e)=>{
    penWidth=pencilWidthElem.value;
    tools.lineWidth= penWidth; 
})
eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth=eraserWidthElem.value;
    tools.lineWidth=eraserWidth;
})
eraser.addEventListener("click",(e)=>{
    if(eraserFlag){
        tools.strokeStyle=eraserColor;
        tools.lineWidth=eraserWidth;

    }
    else{
        tools.strokeStyle=penColor;
        tools.lineWidth=penWidth;
    }
})//download UI
download.addEventListener("click",(e)=>{
let url=canvas.toDataURL();//create url of window
let a=document.createElement("a");
a.href=url;
a.download="board.jpg";
a.click();
})
socket.on("beginPath",(data)=>{
    beginPath(data);
})
socket.on("drawStroke",(data)=>{
    drawStroke(data);
})
socket.on("redoUndo",(data)=>{
    undoRedoCanvas(data);
})

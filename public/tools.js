let pencil=document.querySelector(".pencil");
let pencilCont=document.querySelector(".pencil-tool-cont");
let eraserCont=document.querySelector(".erase-tool-cont");
let eraser=document.querySelector(".eraser");
let optionCont=document.querySelector(".option-cont");
let toolsCont=document.querySelector(".tools-cont");
let sticky=document.querySelector(".stickynotes");
let upload=document.querySelector(".upload");
pencilFlag=false;
eraserFlag=false;
openCont=true;
closeCont=false;
pencil.addEventListener("click",(e)=>{
pencilFlag=!pencilFlag;
if(pencilFlag)pencilCont.style.display="block";
else pencilCont.style.display="none";
})
eraser.addEventListener("click",(e)=>{
    eraserFlag=!eraserFlag;
    if(eraserFlag)eraserCont.style.display="flex";
    else eraserCont.style.display="none";
})
optionCont.addEventListener("click",(e)=>{
    openCont=!openCont;
    closeCont=!closeCont;
if(openCont){
    let iconClass=optionCont.children[0];
    iconClass.classList.remove("fa-times");
    iconClass.classList.add("fa-bars");
    toolsCont.style.display="flex";
}
else{
    let iconClass=optionCont.children[0];
    iconClass.classList.remove("fa-bars");
    iconClass.classList.add("fa-times");
    toolsCont.style.display="none";
}
})
upload.addEventListener("click",(e)=>{
  //open file explorer
  let input=document.createElement("input");
  input.setAttribute("type","file");
  input.click();//clicked
  input.addEventListener("change",(e)=>{
let file=input.files[0];
console.log(file);
let url=URL.createObjectURL(file);
let stickyCont=document.createElement("div");
stickyCont.setAttribute("class","sticky-cont");
stickyCont.innerHTML=`
<div class="header-cont">
  <div class="minimise"></div>
  <div class="remove"></div>
</div>
<div class="note-cont">
<img src=${url}>
</div>`
document.body.appendChild(stickyCont);

let remove=stickyCont.querySelector(".remove");
let minimise=stickyCont.querySelector(".minimise");
noteAction(remove,minimise,stickyCont);


stickyCont.onmousedown = function(event) {
dragAndDrop(stickyCont,event);
};
stickyCont.ondragstart = function() {
return false;
};
  })
  
 

})

sticky.addEventListener("click",(e)=>{
    let stickyCont=document.createElement("div");
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML=`
    <div class="header-cont">
      <div class="minimise"></div>
      <div class="remove"></div>
   </div>
   <div class="note-cont">
     <textarea spellcheck="false"></textarea>
  </div>`
  document.body.appendChild(stickyCont);

  let remove=stickyCont.querySelector(".remove");
  let minimise=stickyCont.querySelector(".minimise");
  noteAction(remove,minimise,stickyCont);

  
  stickyCont.onmousedown = function(event) {
   dragAndDrop(stickyCont,event);
  };
  stickyCont.ondragstart = function() {
    return false;
  };

})
function noteAction(remove,minimise,stickyCont){
  remove.addEventListener("click",(e)=>{
    stickyCont.remove();
  });
  minimise.addEventListener("click",(e)=>{
    let noteCont=stickyCont.querySelector(".note-cont");
    let display=getComputedStyle(noteCont).getPropertyValue("display");
    if(display==="none") noteCont.style.display="block";
    else noteCont.style.display="none";
  });
}
function dragAndDrop(element,event){
  let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
   
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
  };





 

// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener('load', ()=>{
    resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
    document.addEventListener('touchstart', touchstart, false);
    document.addEventListener('touchend', touchend, false);
    document.addEventListener('touchmove', touchmove, false);
});

const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');
const canvasBg = document.querySelector('#canvas-bg');

// Resizes the canvas to the available size of the window.
function resize(){
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// Stores the initial position of the cursor
let coord = {x:0 , y:0}; 

// This is the flag that we are going to use to 
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
  
// The following functions toggle the flag to start
// and stop drawing
function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();

  ctx.lineWidth = 100;

  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round';

  // ctx.strokeStyle = '#33373b';

  if ( canvasBg.classList.contains('dusty') ) {
    ctx.strokeStyle = '#33373b';
  }
  if ( canvasBg.classList.contains('chalk') ) {
    ctx.strokeStyle = 'rgba(81,112,81,.85)';
  }
  if ( canvasBg.classList.contains('white') ) {
    ctx.strokeStyle = 'rgba(247,247,247,.6)';
  }

  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y);
   
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);
   
  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x , coord.y);
    
  // Draws the line.
  ctx.stroke();
}

function touchstart(event) {
  startPainting(event.touches[0]);
}

function touchend(event) {
  stopPainting(event.changedTouches[0]);
}

function touchmove(event) {
  sketch(event.touches[0]);
  event.preventDefault();
}

function erase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var screen = document.querySelector('#screen');

screen.onclick = function() {
  canvasBg.classList.add('dusty');
  canvasBg.classList.remove('chalk', 'white');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var chalk = document.querySelector('#chalk');

chalk.onclick = function() {
  canvasBg.classList.add('chalk');
  canvasBg.classList.remove('dusty', 'white');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var white = document.querySelector('#white');

white.onclick = function() {
  canvasBg.classList.add('white');
  canvasBg.classList.remove('dusty', 'chalk');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

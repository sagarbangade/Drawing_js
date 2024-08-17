const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');

canvas.width = 800;  // Set canvas width
canvas.height = 600; // Set canvas height

let drawing = false;
let erasing = false;

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function setColor(e) {
    ctx.strokeStyle = e.target.value;
}

function setBrushSize(e) {
    ctx.lineWidth = e.target.value;
}

function toggleEraser() {
    erasing = !erasing;
    ctx.strokeStyle = erasing ? '#ffffff' : colorPicker.value;
    eraserButton.textContent = erasing ? 'Brush' : 'Eraser';
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

colorPicker.addEventListener('input', setColor);
brushSizeInput.addEventListener('input', setBrushSize);
eraserButton.addEventListener('click', toggleEraser);
clearButton.addEventListener('click', clearCanvas);

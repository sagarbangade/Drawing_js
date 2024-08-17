const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');
const eraser = document.getElementById('eraser');

let isDrawing = false;
let isErasing = false;

// Start drawing on mouse down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

// Draw on canvas as mouse moves
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = colorPicker.value;
            ctx.lineWidth = brushSize.value;
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    }
});

// Stop drawing on mouse up
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Clear canvas
clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Toggle eraser mode
eraser.addEventListener('click', () => {
    isErasing = !isErasing;
    eraser.style.backgroundColor = isErasing ? '#ddd' : '#fff'; // Change button color to indicate mode
});

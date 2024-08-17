const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear");
const eraserBtn = document.getElementById("eraser");
const colorPicker = document.getElementById("colorPicker");
const colorButton = document.getElementById("colorButton");
const brushSize = document.getElementById("brushSize");

let isDrawing = false;
let color = "white";
let size = 5;
let isEraser = false;
let lastX, lastY;

// Function to resize canvas to fill container
const resizeCanvas = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
};

// Initial resize
resizeCanvas();

// Handle window resize
window.addEventListener("resize", () => {
  resizeCanvas();
});

const getMousePosition = (e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const draw = (e) => {
  if (!isDrawing) return;

  const { x, y } = getMousePosition(e);

  ctx.beginPath();
  ctx.lineWidth = size;
  ctx.lineCap = "round";

  if (isEraser) {
    ctx.globalCompositeOperation = "destination-out"; // Set to eraser mode
    ctx.strokeStyle = "rgba(0,0,0,1)"; // Full opacity for erasing
  } else {
    ctx.globalCompositeOperation = "source-over"; // Set to normal drawing mode
    ctx.strokeStyle = color;
  }

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
};

const startDraw = (e) => {
  isDrawing = true;
  const { x, y } = getMousePosition(e);
  [lastX, lastY] = [x, y];
};

const endDraw = () => {
  isDrawing = false;
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseout", endDraw);

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser;
  eraserBtn.textContent = isEraser ? "Pencil" : "Eraser";
  // Reset the composite operation when switching to/from eraser
  ctx.globalCompositeOperation = "source-over"; // Ensure drawing mode is active
});

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
  colorButton.style.backgroundColor = color; // Update the color button's background
});

brushSize.addEventListener("change", (e) => {
  size = e.target.value;
});

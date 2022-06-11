const preview = document.getElementById("preview");
const slider = document.getElementById("slider");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let colors = [
  [255, 0, 0],
  [255, 125, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255],
  [255, 0, 0],
];

function sliderGradient() {
  slider.style.background = "linear-gradient(to right " + colors.reduce((style, color) => {
      return style + `, rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }, "") +
    ")";
}

sliderGradient();

slider.addEventListener("input", (event) => {
  let max = event.target.max;
  let min = event.target.min;
  let range = max - min;

  let frac = event.target.value / event.target.max;
  let offset = (colors.length - 1) * frac;
  let index = Math.min(Math.floor(offset), colors.length - 1);

  let colorNext = colors[index + 1];
  let colorCurr = colors[index];
  let colorFrac = offset - index;

  function mix(from, to, frac) {
    return parseInt((to - from) * frac + from);
  }

  let r = mix(colorCurr[0], colorNext[0], colorFrac);
  let g = mix(colorCurr[1], colorNext[1], colorFrac);
  let b = mix(colorCurr[2], colorNext[2], colorFrac);
  let color = `rgb(${r}, ${g}, ${b})`

  ctx.fillStyle = color 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  preview.style.backgroundColor = color // Temprory
  whiteGradient()
  blackGradient()

});


function whiteGradient() {
  let whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  whiteGradient.addColorStop(0, "#fff");
  whiteGradient.addColorStop(1, "transparent");
  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function blackGradient() {
  let blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  blackGradient.addColorStop(0, "transparent");
  blackGradient.addColorStop(1, "#000");
  ctx.fillStyle = blackGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
const preview = document.getElementById("preview")
const slider = document.getElementById("slider")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let isMouseDown = false // Flag for switching mouse events
let r, g, b, color

// rainbow like colors for slider gradient
let colors = [
  [255, 0, 0],
  [255, 125, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 255, 255],
  [0, 0, 255],
  [255, 0, 255],
  [255, 0, 0],
]
// stores circle x, y, width, and height to update later on mouse events
var cirPos = {
  x: 10,
  y: 10,
  width: 7,
  height: 7,
}

// draws Circle
function circle() {
  ctx.beginPath()
  ctx.arc(cirPos.x, cirPos.y, cirPos.width, 0, Math.PI * 2)
  ctx.lineWidth = 3
  ctx.strokeStyle = "#fff"
  ctx.stroke()
  console.log("Draw", cirPos.x, cirPos.y)
  ctx.closePath()
}

// initial colors of preview and canvas
function initialColor() {
  ctx.fillStyle = "rgb(0, 255, 106)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  preview.style.backgroundColor = `rgb(0, 255, 106)`
  blackAndWhiteGrad()
}
// slider rainbow gradient
function sliderGradient() {
  slider.style.background =
    "linear-gradient(to right " +
    colors.reduce((style, color) => {
      return style + `, rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }, "") +
    ")"
}
// black and white gradient for canvas
function blackAndWhiteGrad() {
  let whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  whiteGradient.addColorStop(0, "#fff")
  whiteGradient.addColorStop(1, "transparent")
  ctx.fillStyle = whiteGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  blackGradient.addColorStop(0, "transparent")
  blackGradient.addColorStop(1, "#000")
  ctx.fillStyle = blackGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  circle()
}

// updates colors with slider input
function updateColor(event) {
  let frac, offset, index
  let colorNext, colorCurr, colorFrac
  frac = slider.value / event.target.max
  offset = (colors.length - 1) * frac
  index = Math.min(Math.floor(offset), colors.length - 1)
  colorNext = colors[index + 1]
  colorCurr = colors[index]
  colorFrac = offset - index

  // picks color in-between combination of two colors from the colors array on input event
  function mix(from, to, frac) {
    return parseInt((to - from) * frac + from)
  }

  r = mix(colorCurr[0], colorNext[0], colorFrac)
  g = mix(colorCurr[1], colorNext[1], colorFrac)
  b = mix(colorCurr[2], colorNext[2], colorFrac)
  color = `rgb(${r}, ${g}, ${b})`
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// update colors on input/change event of the slider
slider.addEventListener("input", (event) => {
  updateColor(event)
  blackAndWhiteGrad()
})

// call these funtions when the page loads
window.addEventListener("load", (event) => {
  sliderGradient()
  initialColor()
  updateColor(event)
})

//when the mouse is within the canvas boundry move the circle but not working yet, works with slider only
canvas.addEventListener("mousedown", (e) => {
  let currentX = e.clientX - canvas.offsetLeft
  let currentY = e.clientY - canvas.offsetTop

  isMouseDown = true
  cirPos.x = currentX
  cirPos.y = currentY
  console.log("Downed")
})
canvas.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    let currentX = e.clientX - canvas.offsetLeft
    let currentY = e.clientY - canvas.offsetTop
    cirPos.x = currentX
    cirPos.y = currentY
    console.log("Moved")
    console.log(cirPos.x, cirPos.y)
  }
})
// when the mouse is released, stop the circle movement
canvas.addEventListener("mouseup", (e) => {
  isMouseDown = false
  console.log("Uped")
})

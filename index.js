const gridContainer = document.querySelector(".container");
const setupForm = document.querySelector(".setup");
const gridSizeInput = setupForm.querySelector("#grid-size");
const modeInput = document.querySelector("select#mode");
const hoverInput = document.querySelector("#hover");
const gridInput = document.querySelector("#grid");

setupForm.addEventListener("submit", reset);
gridInput.addEventListener("change", updateGrid);

const colorMap = {
  black: (hover = false) => `hsl(0, 0%, ${hover ? 20 : 0}%)`,
  rainbow: function (hover = false, passes = 0) {
    const brightness = 50 - 5 * passes;
    return `hsl(${hover ? this.hue : (this.hue += 8)}, ${
      hover ? 50 : 100
    }%, ${brightness}%)`;
  },
  clear: () => "hsl(0, 0%, 100%)",
  hue: 0,
};

function reset() {
  gridContainer.textContent = "";
  const gridSize = gridSizeInput.value;
  document.documentElement.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridElement = document.createElement("div");
    gridElement.dataset.passes = 0;
    gridElement.addEventListener("mouseenter", hoverEffect);
    gridElement.addEventListener("mousedown", hoverEffect);
    gridElement.addEventListener("mouseleave", changeColor);
    gridElement.addEventListener("mouseup", changeColor);
    gridContainer.appendChild(gridElement);
  }
  updateGrid();
}

function changeColor(e) {
  e.preventDefault();
  if (checkHover(e)) return;
  e.target.style.backgroundColor = colorMap[modeInput.value](
    false,
    e.target.dataset.passes++
  );
}

function hoverEffect(e) {
  e.preventDefault();
  if (checkHover(e)) return;
  if (modeInput.value === "clear") e.target.dataset.passes = 0;
  e.target.style.backgroundColor = colorMap[modeInput.value](
    true,
    e.target.dataset.passes
  );
}

function checkHover(e) {
  //checks if left mouse button is clicked and if hover mode is on
  return e.which !== 1 && !hoverInput.checked;
}

function updateGrid() {
  for (const gridElement of gridContainer.children) {
    if (gridInput.checked) {
      gridElement.classList.add("outline");
    } else {
      gridElement.classList.remove("outline");
    }
  }
}

reset();
import { paletteCalculator } from './utils.js';

const qtg = document.querySelector('#qtg');
const table_container = document.querySelector('.table-container');
const colorContainer1 = document.querySelector('#color-container-1');
const colorContainer2 = document.querySelector('#color-container-2');

function createInput({ containerClassName, defaultColor, title, onColorChange }) {
  const id = `hex-start-${Math.random()}`;

  const inputContainer = document.createElement("div");
  inputContainer.classList.add(`${containerClassName}`);

  const input = document.createElement("input");
  input.setAttribute("type", "color");
  input.setAttribute("class", "link");
  input.setAttribute("id", id);
  input.setAttribute("value", defaultColor);
  input.addEventListener("input", onColorChange);

  const divLabel = document.createElement("div");
  divLabel.classList.add("input-label");
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", id);

  const labelText = document.createTextNode(title);

  inputLabel.appendChild(labelText);
  divLabel.appendChild(inputLabel);

  inputContainer.appendChild(divLabel);
  inputContainer.appendChild(input);

  return {
    getElement() {
      return inputContainer;
    },
    getColor() {
      return input.value;
    },
  };
};

let inputsColor = document.querySelector('.inputs-color');
const firstColorComponent = createInput({
  title: "Color 1",
  containerClassName: "color-start",
  defaultColor: "#FFFFFF",
  onColorChange: handler,
});
const secondColorComponent = createInput({
  title: "Color 2",
  containerClassName: "color-finish",
  defaultColor: "#000000",
  onColorChange: handler,
});

colorContainer1.appendChild(firstColorComponent.getElement());
colorContainer2.appendChild(secondColorComponent.getElement());
qtg.addEventListener("input", handler);

function createTable(palette) {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  for (let i = 0; i < palette.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    const cellText = document.createTextNode(`${palette[i]}`);
    cell.style.backgroundColor = `${palette[i]}`;

    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
  }

  return tbl;
}

function handler() {
  const firstColor = firstColorComponent.getColor();
  const secondColor = secondColorComponent.getColor();

  const palette = paletteCalculator(firstColor, secondColor, qtg.value);
  const table = createTable(palette)

  table_container.innerHTML = '';
  table_container.appendChild(table);
}

handler();

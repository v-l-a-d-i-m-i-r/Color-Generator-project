import { paletteCalculator } from './utils.js';

const qtg = document.querySelector('#qtg');
const table_container = document.querySelector('.table-container');
const colorContainer1 = document.querySelector('#color-container-1');
const colorContainer2 = document.querySelector('#color-container-2');

function createInput({ containerClassName, defaultColor, title, onColorChange }) {
  const id = `hex-start-${Math.random()}`;

  const inputContainer = createElement("div", {
    "class": containerClassName,
  })

  const input = createElement("input", {
    "type": "color",
    "class": "link",
    "id": id,
    "value": defaultColor,
    // "onInput": onColorChange,
  });

  input.addEventListener("input", onColorChange);

  const divLabel = createElement("div", {
    "class": "input-label",
  })

  const inputLabel = createElement("label", {
    "for": id,
  })

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


function createElement(el, obj) {
  const element = document.createElement(el);
  const entries = Object.entries(obj);
  entries.forEach(([key, value]) => {
    element.setAttribute(key, value);
  })

  return element;
}

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
    const blockText = document.createElement("span");
    const cellText = document.createTextNode(`${palette[i]}`);

    cell.style.backgroundColor = `${palette[i]}`;
    blockText.style.fontSize = `25px`;
    blockText.style.color = contrastColor(palette[i]);

    blockText.appendChild(cellText);
    cell.appendChild(blockText);
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


function hexToRgb(hex) {

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}


function contrastColor(background) {

  const brightness = ((hexToRgb(background).r * 299) + (hexToRgb(background).g * 587) + (hexToRgb(background).b * 114)) / 1000;
  return (brightness >= 128) ? '#000' : '#fff';
}


function contrastAutoColor(background) {

  const r = hexToRgb(background).r / 255;
  const g = hexToRgb(background).g / 255;
  const b = hexToRgb(background).b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue,
    saturation,
    lightness;

  if (delta === 0) {
    hue = 0;
  } else if (max === r) {
    hue = ((g - b) / delta) / 6
  } else if (max === g) {
    hue = ((b - r) / delta) + 2;
  } else {
    hue = (r - g) / delta + 4;
  };

  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }
  let oldHue = hue;

  lightness = ((max + min) / 2) * 100;
  let oldLightness = Math.round(lightness);

  saturation = 100;
  if ((oldHue >= 25 && oldHue <= 195) || oldHue >= 295) {
    lightness = 10;
  } else if ((oldHue >= 285 && oldHue < 295) || (oldHue > 195 && oldHue <= 205)) {
    hue = 60;
    lightness = 50;
  } else {
    lightness = 95;
  };

  if ((oldHue >= 295 || (oldHue > 20 && oldHue < 200)) && oldLightness <= 35) {
    lightness = 95;
  } else if (((oldHue < 25 || oldHue > 275) && oldLightness >= 60) || (oldHue > 195 && oldLightness >= 70)) {
    lightness = 10;
  }

  return `hsl(${hue},${saturation}%,${lightness}%)`;

}

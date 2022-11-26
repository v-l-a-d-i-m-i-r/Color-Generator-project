
const hex_start = document.querySelector('#hex-start');
const res_hex_start = document.querySelector('#res_hex-start');

const hex_finish = document.querySelector('#hex-finish');
const res_hex_finish = document.querySelector('#res_hex-finish');

const qtg = document.querySelector('#qtg');
const res_qtg = document.querySelector('#res_qtg');

const table_container = document.querySelector('.table-container');

function createTable(palette) {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  for (i = 0; i < palette.length; i++) {
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
  const palette = paletteCalculator(hex_start.value, hex_finish.value, qtg.value);
  const table = createTable(palette)

  table_container.innerHTML = '';
  table_container.appendChild(table);
}


hex_start.addEventListener("input", handler);
hex_finish.addEventListener("input", handler);
qtg.addEventListener("input", handler);
handler();

function chunksHex(hex) {
  let str = hex.slice(1);
  let arr = [];

  while (str !== '') {
    let num = parseInt(str.slice(0, 2), 16);

    arr.push(num);
    str = str.slice(2);
  }

  return arr;
}


function paletteCalculator(color1, color2, num) {
  const [r1, g1, b1] = chunksHex(color1);
  const [r2, g2, b2] = chunksHex(color2);
  const stepR = (r2 - r1) / (num - 1);
  const stepG = (g2 - g1) / (num - 1);
  const stepB = (b2 - b1) / (num - 1);

  let arr = [];
  for (i = 0; i < num; i++) {
    const resR = Math.round(r1 + i * stepR);
    const resG = Math.round(g1 + i * stepG);
    const resB = Math.round(b1 + i * stepB);
    arr.push(rgbToHex(resR, resG, resB));
  }

  return arr;
}

function componentToHex(c) {
  let hex = c.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};




































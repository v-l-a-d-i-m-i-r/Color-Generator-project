import { paletteCalculator } from './utils.js';

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
  const palette = paletteCalculator(hex_start.value, hex_finish.value, qtg.value);
  const table = createTable(palette)

  table_container.innerHTML = '';
  table_container.appendChild(table);
}

hex_start.addEventListener("input", handler);
hex_finish.addEventListener("input", handler);
qtg.addEventListener("input", handler);
handler();

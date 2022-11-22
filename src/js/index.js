
const hex_start = document.querySelector('#hex-start');
const res_hex_start = document.querySelector('#res_hex-start');

const hex_finish = document.querySelector('#hex-finish');
const res_hex_finish = document.querySelector('#res_hex-finish');

const qtg = document.querySelector('#qtg');
const res_qtg = document.querySelector('#res_qtg');

function handler() {

    const palette = paletteCalculator(hex_start.value, hex_finish.value, qtg.value)
    console.log(palette);
}

hex_start.addEventListener("input", handler);
hex_finish.addEventListener("input", handler);
qtg.addEventListener("input", handler);

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

const arrStart = chunksHex("#f5cccc");
const arrFinish = chunksHex("#c52626");

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

// console.log(paletteCalculator('#ffffff', '#000000', 4));



// function hexToRgb(hex) {
//   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16)
//   } : null;
// }

// console.log(hexToRgb("#0033ff").g); // "51";


function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};


































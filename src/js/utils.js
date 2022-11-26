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

function componentToHex(c) {
  let hex = c.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export function paletteCalculator(color1, color2, num) {
  const [r1, g1, b1] = chunksHex(color1);
  const [r2, g2, b2] = chunksHex(color2);
  const stepR = (r2 - r1) / (num - 1);
  const stepG = (g2 - g1) / (num - 1);
  const stepB = (b2 - b1) / (num - 1);

  let arr = [];
  for (let i = 0; i < num; i++) {
    const resR = Math.round(r1 + i * stepR);
    const resG = Math.round(g1 + i * stepG);
    const resB = Math.round(b1 + i * stepB);
    arr.push(rgbToHex(resR, resG, resB));
  }

  return arr;
}

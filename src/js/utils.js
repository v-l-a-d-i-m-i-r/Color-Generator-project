function chunksHex(hex) {
  let str = hex.slice(1);
  const arr = [];

  while (str !== '') {
    const num = parseInt(str.slice(0, 2), 16);

    arr.push(num);
    str = str.slice(2);
  }

  return arr;
}

function componentToHex(c) {
  const hex = c.toString(16);

  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function paletteCalculator(color1, color2, num) {
  const [r1, g1, b1] = chunksHex(color1);
  const [r2, g2, b2] = chunksHex(color2);
  const stepR = (r2 - r1) / (num - 1);
  const stepG = (g2 - g1) / (num - 1);
  const stepB = (b2 - b1) / (num - 1);

  const arr = [];
  for (let i = 0; i < num; i++) {
    const resR = Math.round(r1 + i * stepR);
    const resG = Math.round(g1 + i * stepG);
    const resB = Math.round(b1 + i * stepB);
    arr.push(rgbToHex(resR, resG, resB));
  }

  return arr;
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export const getRandomString = () => Math.random().toString();

// accepts 6 digits hex format only
export const isHexValid = (string) => /^#(?:[0-9a-fA-F]{3}){2}$/.test(string);

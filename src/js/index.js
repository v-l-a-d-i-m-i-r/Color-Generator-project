

// const inputs = document.querySelectorAll('.input');
// console.log(inputs[1]);
// console.log(inputs[2]);

// const inputColor = inputs[1];
// const inputNumber = inputs[2];

const hex_one = document.querySelector('#hex-one');
const res_hex_one = document.querySelector('#res_hex-one');

const hex_two = document.querySelector('#hex-two');
const res_hex_two = document.querySelector('#res_hex-two');

const qtg = document.querySelector('#qtg');
const res_qtg = document.querySelector('#res_qtg');

hex_one.addEventListener("input", function () {

  res_hex_one.innerHTML = hex_one.value;

});


hex_two.addEventListener("input", function () {

  res_hex_two.innerHTML = hex_two.value;

});

qtg.addEventListener("input", function () {

  res_qtg.innerHTML = qtg.value;

});





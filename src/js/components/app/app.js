import { createElement } from '../../lib.js';
import { colors } from '../../constants/constants.js';

import { Quantity } from '../quantity/quantity.js';
import { ColorInput } from '../color-input/color-input.js';

export const App = () => createElement('div', { class: 'wrapper' }, [
  createElement('header', { class: 'header' }, [
    createElement('div', { class: 'container' }),
  ]),

  createElement('div', { class: 'container' }, [
    createElement('section', { class: 'inputs-color' }, [
      createElement('div', { id: 'color-container-1' }, [
        ColorInput({ title: 'Color 1', containerClassName: 'color-start', colorId: colors.FIRST }),
      ]),
      createElement('div', { id: 'color-container-2' }, [
        ColorInput({ title: 'Color 2', containerClassName: 'color-finish', colorId: colors.SECOND }),
      ]),

      Quantity(),
    ]),

    createElement('section', { class: 'table-container' }),
  ]),
]);

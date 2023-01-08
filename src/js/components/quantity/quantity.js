import { createElement } from '../../lib.js';
import { dispatcher } from '../../services/dispatcher.js';
import { actions, events } from '../../constants/constants.js';

const { CHANGE_QUANTITY } = actions;
const { QUANTITY_CHANGED } = events;

export const Quantity = () => {
  const inputElement = createElement('input', {
    type: 'number',
    class: 'link',
    id: 'qtg',
    name: 'number',
    max: '20',
    min: '3',
    onInput: (event) => dispatcher.dispatch(CHANGE_QUANTITY, event.target.value),
  });

  dispatcher.subscribe(QUANTITY_CHANGED, (value) => { inputElement.value = value; });

  return createElement('div', { class: 'number' }, [
    createElement('div', { class: 'input-label' }, [
      createElement('label', { for: 'qtg' }, ['Quantity']),
    ]),
    inputElement,
  ]);
};

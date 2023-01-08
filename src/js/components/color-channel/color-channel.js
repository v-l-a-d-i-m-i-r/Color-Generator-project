import { createElement } from '../../lib.js';
import { dispatcher } from '../../services/dispatcher.js';
import { actions, events } from '../../constants/constants.js';

const { CHANNEL_CHANGED } = events;
const { CHANGE_CHANNEL } = actions;

export const ColorChannel = ({
  title, colorId, channel, min, max,
}) => {
  const onInput = (event) => dispatcher
    .dispatch(CHANGE_CHANNEL, { colorId, channel, value: parseInt(event.target.value, 10) });

  const numberInput = createElement('input', {
    type: 'number', min, max, onInput,
  });
  const rangeInput = createElement('input', {
    type: 'range', min, max, onInput,
  });

  dispatcher.subscribe(CHANNEL_CHANGED, (payload) => {
    if (payload.colorId !== colorId || payload.channel !== channel) {
      return;
    }

    numberInput.value = payload.value;
    rangeInput.value = payload.value;
  });

  return createElement('div', {}, [
    title,
    numberInput,
    rangeInput,
  ]);
};

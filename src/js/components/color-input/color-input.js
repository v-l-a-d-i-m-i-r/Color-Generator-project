import { createElement } from '../../lib.js';
import { dispatcher } from '../../services/dispatcher.js';
import { getRandomString } from '../../utils.js';
import { actions, events, channels } from '../../constants/constants.js';

import { ColorChannel } from '../color-channel/color-channel.js';

const { CHANNEL_CHANGED } = events;
const { CHANGE_CHANNEL } = actions;
const {
  HEX, RGB_R, RGB_G, RGB_B,
} = channels;

export const ColorInput = ({ title, colorId, containerClassName }) => {
  const id = getRandomString();
  const onInput = (event) => dispatcher
    .dispatch(CHANGE_CHANNEL, { colorId, channel: HEX, value: event.target.value });

  const colorPickerInput = createElement('input', {
    type: 'color', class: 'link', id, onInput,
  });
  const textInput = createElement('input', { type: 'text', class: 'link', onInput });

  dispatcher.subscribe(CHANNEL_CHANGED, (payload) => {
    if (payload.colorId !== colorId || payload.channel !== HEX) {
      return;
    }
    // console.log(payload.value);
    colorPickerInput.value = payload.value;
    textInput.value = payload.value;
  });

  return createElement('div', { class: containerClassName }, [
    createElement('div', { class: 'input-label' }, [
      createElement('label', { id }, [title]),
    ]),
    colorPickerInput,
    textInput,
    ColorChannel({
      title: 'R', colorId, channel: RGB_R, min: 0, max: 255,
    }),
    ColorChannel({
      title: 'G', colorId, channel: RGB_G, min: 0, max: 255,
    }),
    ColorChannel({
      title: 'B', colorId, channel: RGB_B, min: 0, max: 255,
    }),
  ]);
};

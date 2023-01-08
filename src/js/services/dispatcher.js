import { EventEmitter } from './event-emitter.service.js';
import {
  colors, actions, events, channels,
} from '../constants/constants.js';
import { hexToRgb, isHexValid, rgbToHex } from '../utils.js';

const { FIRST, SECOND } = colors;
const { QUANTITY_CHANGED, CHANNEL_CHANGED } = events;
const {
  HEX, RGB_R, RGB_G, RGB_B,
} = channels;

const emmitChannelsUpdated = (eventEmitter, state, colorId) => {
  Object
    .values(channels)
    .forEach((channel) => eventEmitter.emmit(CHANNEL_CHANGED, {
      colorId,
      channel,
      value: state[colorId][channel],
    }));
};

const Dispatcher = () => {
  const eventEmitter = EventEmitter();
  const state = {
    quantity: 2,
    [FIRST]: {
      [HEX]: '#000000',
      [RGB_R]: 0,
      [RGB_G]: 0,
      [RGB_B]: 0,
    },
    [SECOND]: {
      [HEX]: '#FFFFFF',
      [RGB_R]: 255,
      [RGB_G]: 255,
      [RGB_B]: 255,
    },
  };

  const dispatch = (action, data) => {
    console.table({ action, data: JSON.stringify(data) });

    switch (action) {
      case actions.INIT: {
        eventEmitter.emmit(QUANTITY_CHANGED, state.quantity);

        Object
          .values(colors)
          .forEach((colorId) => {
            emmitChannelsUpdated(eventEmitter, state, colorId);
          });
        break;
      }
      case actions.CHANGE_QUANTITY: {
        eventEmitter.emmit(QUANTITY_CHANGED, data);
        break;
      }
      case actions.CHANGE_CHANNEL: {
        const { colorId, channel, value } = data;

        if (channel === HEX && !isHexValid(value)) {
          return;
        }

        state[colorId][channel] = value;

        if (channel === RGB_R || channel === RGB_G || channel === RGB_B) {
          const hex = rgbToHex(state[colorId][RGB_R], state[colorId][RGB_G], state[colorId][RGB_B]);

          state[colorId][HEX] = hex;
        }

        if (channel === HEX) {
          const { r, g, b } = hexToRgb(state[colorId][HEX]);

          state[colorId][RGB_R] = r;
          state[colorId][RGB_G] = g;
          state[colorId][RGB_B] = b;
        }

        emmitChannelsUpdated(eventEmitter, state, colorId);
        break;
      }
      default:
    }
  };

  return {
    subscribe: (...args) => eventEmitter.on(...args),
    dispatch,
  };
};

export const dispatcher = Dispatcher();

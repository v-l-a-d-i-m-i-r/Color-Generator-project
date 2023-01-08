export const EventEmitter = () => {
  const listeners = [];

  return {
    on: (event, callback) => {
      listeners.push({ event, callback });
    },
    emmit: (event, data) => {
      listeners
        .filter((listener) => listener.event === event)
        .forEach(({ callback }) => callback(data));
    },
  };
};

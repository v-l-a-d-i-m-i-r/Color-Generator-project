export const createElement = (type, props = {}, children = []) => {
  const element = document.createElement(type);

  Object
    .entries(props)
    .forEach(([key, value]) => {
      if (key.startsWith('on')) {
        const event = key.toLowerCase().substring(2);

        element.addEventListener(event, value);

        return;
      }

      element.setAttribute(key, value);
    });

  children
    .forEach((child) => {
      element.appendChild(
        typeof child === 'string' ? document.createTextNode(child) : child,
      );
    });

  return element;
};

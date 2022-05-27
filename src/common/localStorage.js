const localName = 'readerAppState';

const localStorageFuncs = {
  save: (state) => localStorage.setItem(localName, JSON.stringify(state)),
  load: () => (JSON.parse(localStorage.getItem(localName)) ?? {}),
};

export default (type) => localStorageFuncs[type];

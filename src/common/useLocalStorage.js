const localName = 'readerAppState';

export default () => {
  const loadFromLocalStorage = () => (JSON.parse(localStorage.getItem(localName)) ?? {});
  const saveToLocalStorage = (state) => localStorage.setItem(localName, JSON.stringify(state));

  return { loadFromLocalStorage, saveToLocalStorage };
};

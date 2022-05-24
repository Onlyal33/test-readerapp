import LibraryItem from './LibraryItem.jsx';
import SearchItem from './Searchitem.jsx';

const items = {
  library: LibraryItem,
  search: SearchItem,
};

const getItem = (type) => items[type];

const Item = ({ type, id }) => {
  const Component = getItem(type);
  return <Component id={id} />;
};

export default Item;

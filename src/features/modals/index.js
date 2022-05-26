import AddList from './AddList.jsx';
import DeleteList from './DeleteList.jsx';
import RenameList from './RenameList.jsx';
import EditNotes from './EditNotes.jsx';
import AddItemToList from './AddItemToList.jsx';
import RemoveItemFromList from './RemoveItemFromList.jsx';
import AddItem from './AddItem.jsx';
import DeleteItem from './DeleteItem.jsx';

const modals = {
  add: AddList,
  delete: DeleteList,
  rename: RenameList,
  addToList: AddItemToList,
  removeFromList: RemoveItemFromList,
  deleteItem: DeleteItem,
  editNotes: EditNotes,
  addItem: AddItem,
};

export default (modalName) => modals[modalName];
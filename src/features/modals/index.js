import AddList from './AddList.jsx';
import DeleteList from './DeleteList.jsx';
import RenameList from './RenameList.jsx';
import EditNotes from './EditNotes.jsx';
import AddItemToList from './AddItemToList.jsx';
import RemoveItemFromList from './RemoveItemFromList.jsx';
import DeleteItem from './DeleteItem.jsx';

const modals = {
  addList: AddList,
  deleteList: DeleteList,
  renameList: RenameList,
  addItemToList: AddItemToList,
  removeItemFromList: RemoveItemFromList,
  deleteItem: DeleteItem,
  editNotes: EditNotes,
};

export default (modalName) => modals[modalName];

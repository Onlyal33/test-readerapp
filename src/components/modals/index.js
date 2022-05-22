import AddList from './AddList.jsx';
import DeleteList from './DeleteList.jsx';
import RenameList from './RenameList.jsx';
import EditNotes from './EditNotes.jsx';
import AddToList from './AddToList.jsx';
import RemoveFromList from './RemoveFromList.jsx';
import AddItem from './AddItem.jsx';
import DeleteItem from './DeleteItem.jsx';

const modals = {
  add: AddList,
  delete: DeleteList,
  rename: RenameList,
  addToList: AddToList,
  removeFromList: RemoveFromList,
  deleteItem: DeleteItem,
  editNotes: EditNotes,
  addItem: AddItem,
};

export default (modalName) => modals[modalName];

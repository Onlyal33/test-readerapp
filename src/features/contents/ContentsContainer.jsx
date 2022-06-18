import { useSelector } from 'react-redux';

import { selectActiveItemId } from '../uiSlice.js';
import Contents from './Contents.jsx';

const ContentsContainer = () => {
  const activeItemId = useSelector(selectActiveItemId);

  return activeItemId && <Contents itemId={activeItemId} />;
};

export default ContentsContainer;

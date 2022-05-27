import {
  Card, Button, Tabs, Tab,
} from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';

import Notes from './Notes';
import { selectLibraryItems } from './items/itemsSlice';
import { selectSearchItems } from './search/searchResultsSlice';
import { selectActiveItemId } from './uiSlice';

const selectLibraryItem = createSelector(
  [selectLibraryItems, selectActiveItemId],
  (libraryItems, activeItemId) => libraryItems[activeItemId],
);

const selectSearchItem = createSelector(
  [selectSearchItems, selectActiveItemId],
  (searchItems, activeItemId) => searchItems[activeItemId],
);

const selectActiveItem = createSelector(
  [selectLibraryItem, selectSearchItem],
  (libraryItem, searchItem) => libraryItem ?? searchItem,
);

const Contents = () => {
  const activeItem = useSelector(selectActiveItem, shallowEqual);
  const [openNotes, setOpenNotes] = useState(false);

  if (!activeItem) {
    return null;
  }

  const {
    title, author, firstPublishYear, description, place, language, subject, notes, id,
  } = activeItem;
  return (
    <Card className="border-0 my-2 flex-grow-1 overflow-auto">
      <Card.Body>
        <Card.Title aria-label="title">
          {title}
        </Card.Title>
        <Card.Subtitle aria-label="author">
          by
          {' '}
          {author?.join(', ')}
        </Card.Subtitle>
        <Card.Text aria-label="year" className="fst-italic text-muted">
          {firstPublishYear}
        </Card.Text>
        <Card.Text aria-label="language" className="text-muted">
          Languages:
          {' '}
          {language.join(', ')}
        </Card.Text>
        <Tabs defaultActiveKey="description" className="">
          <Tab eventKey="description" title="Description">
            <Card.Text className="pt-2">{description || 'No description avaliable'}</Card.Text>
          </Tab>
          <Tab eventKey="subjects" title="Subjects">
            <Card.Text className="pt-2">{subject.join(', ') || 'No subjects avaliable'}</Card.Text>
          </Tab>
          <Tab eventKey="places" title="Places">
            <Card.Text className="pt-2">{place.join(', ') || 'No places avaliable'}</Card.Text>
          </Tab>
          <Tab eventKey="notes" title="Notes">
            {openNotes
              ? <Notes id={id} savedNotes={notes} onHide={() => setOpenNotes(!openNotes)} />
              : (
                <>
                  <div className="p-2">{notes || 'No notes avaliable'}</div>
                  <Button variant="primary" onClick={() => setOpenNotes(!openNotes)}>Edit Notes</Button>
                </>
              )}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default Contents;

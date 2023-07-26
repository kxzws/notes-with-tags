import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './db';
import { Header } from './components';
import { NotesList } from './views';

const App = () => {
  const notes = useLiveQuery(() => db.notes.toArray());

  return (
    <>
      <Header notes={notes} />
      <NotesList notes={notes} />
    </>
  );
};

export default App;

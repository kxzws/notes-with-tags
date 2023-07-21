import { combineReducers } from 'redux';
import notesReducer from './notes/slices';

const rootReducer = combineReducers({
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from 'redux';
// import walletReducer from './wallet/slices';

const rootReducer = combineReducers({
  // wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

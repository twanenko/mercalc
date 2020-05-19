import { combineReducers } from '@reduxjs/toolkit';
import prayerModule from './modules/prayerModule';

const rootReducer = combineReducers({
  prayer: prayerModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

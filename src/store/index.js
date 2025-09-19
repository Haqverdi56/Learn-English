import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';
import authSlice from './slices/authSlice';
import languageSlice from './slices/languageSlice';
import themeSlice from './slices/themeSlice';
import subscriptionSlice from './slices/subscriptionSlice';
import vocabularySlice from './slices/vocabularySlice';
import progressSlice from './slices/progressSlice';
import dailyWordsSlice from './slices/dailyWordsSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
		language: languageSlice,
		theme: themeSlice,
		subscription: subscriptionSlice,
		vocabulary: vocabularySlice,
		progress: progressSlice,
		dailyWords: dailyWordsSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// export type RootState = typeof store.getState;
// export AppDispatch = typeof store.dispatch;

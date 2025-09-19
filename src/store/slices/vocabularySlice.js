import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	learnedWords: JSON.parse(localStorage.getItem('learnedWords')) || [],
	unknownWords: JSON.parse(localStorage.getItem('unknownWords')) || [],
};

const vocabularySlice = createSlice({
	name: 'vocabulary',
	initialState,
	reducers: {
		addToLearned: (state, action) => {
			const wordId = action.payload;
			state.learnedWords = [...state.learnedWords.filter((id) => id !== wordId), wordId];
			state.unknownWords = state.unknownWords.filter((id) => id !== wordId);
			localStorage.setItem('learnedWords', JSON.stringify(state.learnedWords));
			localStorage.setItem('unknownWords', JSON.stringify(state.unknownWords));
		},
		addToUnknown: (state, action) => {
			const wordId = action.payload;
			state.unknownWords = [...state.unknownWords.filter((id) => id !== wordId), wordId];
			state.learnedWords = state.learnedWords.filter((id) => id !== wordId);
			localStorage.setItem('learnedWords', JSON.stringify(state.learnedWords));
			localStorage.setItem('unknownWords', JSON.stringify(state.unknownWords));
		},
		removeFromLearned: (state, action) => {
			const wordId = action.payload;
			state.learnedWords = state.learnedWords.filter((id) => id !== wordId);
			localStorage.setItem('learnedWords', JSON.stringify(state.learnedWords));
		},
		removeFromUnknown: (state, action) => {
			const wordId = action.payload;
			state.unknownWords = state.unknownWords.filter((id) => id !== wordId);
			localStorage.setItem('unknownWords', JSON.stringify(state.unknownWords));
		},
	},
});

export const { addToLearned, addToUnknown, removeFromLearned, removeFromUnknown } = vocabularySlice.actions;

// Selectors
export const isLearned = (state, wordId) => state?.vocabulary?.learnedWords?.includes(wordId);
export const isUnknown = (state, wordId) => state?.vocabulary?.unknownWords?.includes(wordId);

export default vocabularySlice.reducer;

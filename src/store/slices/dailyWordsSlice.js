import { createSlice } from '@reduxjs/toolkit';
import { getAllWords } from '../../data/words';

const getDateKey = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
};

const initialState = {
  dailyWords: JSON.parse(localStorage.getItem('dailyWords')) || {},
  usedWordIds: JSON.parse(localStorage.getItem('usedWordIds')) || [],
  currentDate: getDateKey(),
};

const dailyWordsSlice = createSlice({
  name: 'dailyWords',
  initialState,
  reducers: {
    generateDailyWords: (state) => {
      const today = getDateKey();
      
      // If words already exist for today, don't regenerate
      if (state.dailyWords[today]) {
        return;
      }
      
      const allWords = getAllWords();
      const availableWords = allWords.filter(word => !state.usedWordIds.includes(word.id));
      
      if (availableWords.length < 10) {
        // Not enough words available
        state.dailyWords[today] = [];
        return;
      }
      
      // Shuffle and take 10 words
      const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
      const todaysWords = shuffled.slice(0, 10);
      
      state.dailyWords[today] = todaysWords;
      state.usedWordIds = [...state.usedWordIds, ...todaysWords.map(w => w.id)];
      state.currentDate = today;
      
      localStorage.setItem('dailyWords', JSON.stringify(state.dailyWords));
      localStorage.setItem('usedWordIds', JSON.stringify(state.usedWordIds));
    },
    resetDailyWords: (state) => {
      state.dailyWords = {};
      state.usedWordIds = [];
      localStorage.removeItem('dailyWords');
      localStorage.removeItem('usedWordIds');
    },
  },
});

export const { generateDailyWords, resetDailyWords } = dailyWordsSlice.actions;

// Selectors
export const selectTodaysWords = (state) => {
  const today = getDateKey();
  return state.dailyWords.dailyWords[today] || [];
};

export const selectHasWordsForToday = (state) => {
  const today = getDateKey();
  const todaysWords = state.dailyWords.dailyWords[today];
  return todaysWords && todaysWords.length > 0;
};

export const selectCanGenerateWords = (state) => {
  const allWords = getAllWords();
  return allWords.length - state.dailyWords.usedWordIds.length >= 10;
};

export default dailyWordsSlice.reducer;
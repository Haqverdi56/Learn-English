import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stats: JSON.parse(localStorage.getItem('userProgress')) || {
		wordsLearned: 0,
		storiesCompleted: 0,
		lessonsCompleted: 0,
		skillsProgress: {
			listening: 0,
			reading: 0,
			writing: 0,
			speaking: 0,
		},
		grammarTopicsCompleted: 0,
		currentLevel: 'A1',
		totalStudyTime: 0, // in minutes
		streak: 0,
		lastStudyDate: null,
	},
	achievements: JSON.parse(localStorage.getItem('userAchievements')) || [],
};

const progressSlice = createSlice({
	name: 'progress',
	initialState,
	reducers: {
		incrementWordsLearned: (state) => {
			state.stats.wordsLearned += 1;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		incrementStoriesCompleted: (state) => {
			state.stats.storiesCompleted += 1;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		incrementLessonsCompleted: (state) => {
			state.stats.lessonsCompleted += 1;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		updateSkillProgress: (state, action) => {
			const { skill, progress } = action.payload;
			state.stats.skillsProgress[skill] = Math.max(state.stats.skillsProgress[skill], progress);
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		incrementGrammarCompleted: (state) => {
			state.stats.grammarTopicsCompleted += 1;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		updateLevel: (state, action) => {
			state.stats.currentLevel = action.payload;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		addStudyTime: (state, action) => {
			state.stats.totalStudyTime += action.payload;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		updateStreak: (state) => {
			const today = new Date().toDateString();
			const lastStudy = state.stats.lastStudyDate;

			if (lastStudy === today) {
				// Already studied today
				return;
			}

			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);

			if (lastStudy === yesterday.toDateString()) {
				// Consecutive day
				state.stats.streak += 1;
			} else if (lastStudy !== today) {
				// Streak broken
				state.stats.streak = 1;
			}

			state.stats.lastStudyDate = today;
			localStorage.setItem('userProgress', JSON.stringify(state.stats));
		},
		addAchievement: (state, action) => {
			const achievement = action.payload;
			if (!state.achievements.find((a) => a.id === achievement.id)) {
				state.achievements.push({
					...achievement,
					unlockedAt: new Date().toISOString(),
				});
				localStorage.setItem('userAchievements', JSON.stringify(state.achievements));
			}
		},
	},
});

export const {
	incrementWordsLearned,
	incrementStoriesCompleted,
	incrementLessonsCompleted,
	updateSkillProgress,
	incrementGrammarCompleted,
	updateLevel,
	addStudyTime,
	updateStreak,
	addAchievement,
} = progressSlice.actions;

export default progressSlice.reducer;

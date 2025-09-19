import { createSlice } from '@reduxjs/toolkit';

const translations = {
	en: {
		home: 'Home',
		wordLearning: 'Learn Words',
		storyListening: 'Listen Stories',
		dictionary: 'Dictionary',
		grammar: 'Grammar',
		skills: 'Skills',
		extraFeatures: 'Extra Features',
		teachers: 'Teachers',
		subscription: 'Subscription',
		english: 'English',
		azerbaijani: 'Azerbaijani',
		play: 'Play',
		stop: 'Stop',
		slow: 'Slow',
		normal: 'Normal',
		fast: 'Fast',
		translate: 'Translate',
		close: 'Close',
		level: 'Level',
		synonyms: 'Synonyms',
		antonyms: 'Antonyms',
		learned: 'Learned',
		unknown: 'Unknown',
		watch: 'Watch',
		minutes: 'minutes',
		loadMore: 'Load More',
		search: 'Search',
		filter: 'Filter',
		noun: 'Noun',
		verb: 'Verb',
		adjective: 'Adjective',
		adverb: 'Adverb',
		preposition: 'Preposition',
		conjunction: 'Conjunction',
		pronoun: 'Pronoun',
		interjection: 'Interjection',
	},
	az: {
		home: 'Ana Səhifə',
		wordLearning: 'Söz Öyrən',
		storyListening: 'Hekayə Dinlə',
		dictionary: 'Lüğət',
		grammar: 'Qrammatika',
		skills: 'Bacarıqlar',
		extraFeatures: 'Əlavə Funksiyalar',
		teachers: 'Müəllimlər',
		subscription: 'Abunəlik',
		english: 'İngilis',
		azerbaijani: 'Azərbaycan',
		play: 'Oynat',
		stop: 'Dayandır',
		slow: 'Yavaş',
		normal: 'Normal',
		fast: 'Sürətli',
		translate: 'Tərcümə et',
		close: 'Bağla',
		level: 'Səviyyə',
		synonyms: 'Sinonimlər',
		antonyms: 'Antonimlər',
		learned: 'Öyrənildi',
		unknown: 'Bilinməyən',
		watch: 'Bax',
		minutes: 'dəqiqə',
		loadMore: 'Daha Çox Yüklə',
		search: 'Axtar',
		filter: 'Filter',
		noun: 'İsim',
		verb: 'Feil',
		adjective: 'Sifət',
		adverb: 'Zərf',
		preposition: 'Əvəzlik',
		conjunction: 'Bağlayıcı',
		pronoun: 'Əvəzlik',
		interjection: 'Nida',
	},
};

const initialState = {
	currentLanguage: localStorage.getItem('language') || 'az',
	translations,
};

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage: (state, action) => {
			state.currentLanguage = action.payload;
			localStorage.setItem('language', action.payload);
		},
		toggleLanguage: (state) => {
			state.currentLanguage = state.currentLanguage === 'az' ? 'en' : 'az';
			localStorage.setItem('language', state.currentLanguage);
		},
	},
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

// Selectors
export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectTranslations = (state) => state.language.translations[state.language.currentLanguage];

export default languageSlice.reducer;

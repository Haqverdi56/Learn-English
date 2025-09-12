import React, { createContext, useContext, useState } from 'react';

const translations = {
	en: {
		home: 'Home',
		wordLearning: 'Learn Words',
		storyListening: 'Listen Stories',
		dictionary: 'Dictionary',
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

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [currentLanguage, setCurrentLanguage] = useState('az');

	return <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, translations }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};

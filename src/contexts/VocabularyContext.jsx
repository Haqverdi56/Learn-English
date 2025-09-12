import React, { createContext, useContext, useState, useEffect } from 'react';

const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
	const [learnedWords, setLearnedWords] = useState([]);
	const [unknownWords, setUnknownWords] = useState([]);

	useEffect(() => {
		const learned = localStorage.getItem('learnedWords');
		const unknown = localStorage.getItem('unknownWords');

		if (learned) setLearnedWords(JSON.parse(learned));
		if (unknown) setUnknownWords(JSON.parse(unknown));
	}, []);

	useEffect(() => {
		localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
	}, [learnedWords]);

	useEffect(() => {
		localStorage.setItem('unknownWords', JSON.stringify(unknownWords));
	}, [unknownWords]);

	const addToLearned = (wordId) => {
		setLearnedWords((prev) => [...prev.filter((id) => id !== wordId), wordId]);
		setUnknownWords((prev) => prev.filter((id) => id !== wordId));
	};

	const addToUnknown = (wordId) => {
		setUnknownWords((prev) => [...prev.filter((id) => id !== wordId), wordId]);
		setLearnedWords((prev) => prev.filter((id) => id !== wordId));
	};

	const removeFromLearned = (wordId) => {
		setLearnedWords((prev) => prev.filter((id) => id !== wordId));
	};

	const removeFromUnknown = (wordId) => {
		setUnknownWords((prev) => prev.filter((id) => id !== wordId));
	};

	const isLearned = (wordId) => learnedWords.includes(wordId);
	const isUnknown = (wordId) => unknownWords.includes(wordId);

	return (
		<VocabularyContext.Provider
			value={{
				learnedWords,
				unknownWords,
				addToLearned,
				addToUnknown,
				removeFromLearned,
				removeFromUnknown,
				isLearned,
				isUnknown,
			}}
		>
			{children}
		</VocabularyContext.Provider>
	);
};

export const useVocabulary = () => {
	const context = useContext(VocabularyContext);
	if (!context) {
		throw new Error('useVocabulary must be used within a VocabularyProvider');
	}
	return context;
};

export const dictionaryData = [
	{
		id: 'dict-1',
		english: 'Apple',
		azerbaijani: 'Alma',
		partOfSpeech: 'noun',
		level: ['A1'],
		definition: 'A round fruit with red or green skin',
		example: 'I eat an apple every day.',
		synonyms: [],
		antonyms: [],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-2',
		english: 'Run',
		azerbaijani: 'Qaçmaq',
		partOfSpeech: 'verb',
		level: ['A1'],
		definition: 'To move quickly on foot',
		example: 'I run every morning.',
		synonyms: ['Sprint', 'Jog', 'Dash'],
		antonyms: ['Walk', 'Crawl'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-3',
		english: 'Beautiful',
		azerbaijani: 'Gözəl',
		partOfSpeech: 'adjective',
		level: ['A2'],
		definition: 'Pleasing to look at; attractive',
		example: 'She has beautiful eyes.',
		synonyms: ['Pretty', 'Lovely', 'Gorgeous'],
		antonyms: ['Ugly', 'Hideous'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-4',
		english: 'Quickly',
		azerbaijani: 'Tez',
		partOfSpeech: 'adverb',
		level: ['A2'],
		definition: 'At a fast speed; rapidly',
		example: 'He finished his work quickly.',
		synonyms: ['Fast', 'Rapidly', 'Swiftly'],
		antonyms: ['Slowly', 'Gradually'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-5',
		english: 'Under',
		azerbaijani: 'Altında',
		partOfSpeech: 'preposition',
		level: ['A1'],
		definition: 'Below or beneath something',
		example: 'The cat is under the table.',
		synonyms: ['Below', 'Beneath'],
		antonyms: ['Above', 'Over'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-6',
		english: 'And',
		azerbaijani: 'Və',
		partOfSpeech: 'conjunction',
		level: ['A1'],
		definition: 'Used to connect words or phrases',
		example: 'I like tea and coffee.',
		synonyms: ['Plus', 'Also'],
		antonyms: [],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-7',
		english: 'He',
		azerbaijani: 'O (kişi)',
		partOfSpeech: 'pronoun',
		level: ['A1'],
		definition: 'Used to refer to a male person',
		example: 'He is my brother.',
		synonyms: [],
		antonyms: ['She'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: 'dict-8',
		english: 'Wow',
		azerbaijani: 'Vay',
		partOfSpeech: 'interjection',
		level: ['A1'],
		definition: 'Used to express surprise or amazement',
		example: "Wow! That's amazing!",
		synonyms: ['Amazing', 'Incredible'],
		antonyms: [],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
];

// Generate more dictionary words
const baseDictionaryWords = [
	{ english: 'House', azerbaijani: 'Ev', partOfSpeech: 'noun', level: ['A1'] },
	{ english: 'Walk', azerbaijani: 'Gəzmək', partOfSpeech: 'verb', level: ['A1'] },
	{ english: 'Happy', azerbaijani: 'Xoşbəxt', partOfSpeech: 'adjective', level: ['A1'] },
	{ english: 'Slowly', azerbaijani: 'Yavaş-yavaş', partOfSpeech: 'adverb', level: ['A2'] },
	{ english: 'In', azerbaijani: 'İçində', partOfSpeech: 'preposition', level: ['A1'] },
	{ english: 'But', azerbaijani: 'Amma', partOfSpeech: 'conjunction', level: ['A1'] },
	{ english: 'She', azerbaijani: 'O (qadın)', partOfSpeech: 'pronoun', level: ['A1'] },
	{ english: 'Hello', azerbaijani: 'Salam', partOfSpeech: 'interjection', level: ['A1'] },
];

export const generateMoreDictionaryWords = (count) => {
	const newWords = [];

	for (let i = 0; i < count; i++) {
		const baseIndex = i % baseDictionaryWords.length;
		const baseWord = baseDictionaryWords[baseIndex];

		const newWord = {
			id: `dict-generated-${i + 9}`,
			english: baseWord.english,
			azerbaijani: baseWord.azerbaijani,
			partOfSpeech: baseWord.partOfSpeech,
			level: baseWord.level,
			definition: `Definition for ${baseWord.english}`,
			example: `Example sentence with ${baseWord.english}.`,
			synonyms: ['Synonym1', 'Synonym2'],
			antonyms: ['Antonym1', 'Antonym2'],
			pronunciation: {
				uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
				us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			},
		};

		newWords.push(newWord);
	}

	return newWords;
};

export const getAllDictionaryWords = () => {
	return [...dictionaryData, ...generateMoreDictionaryWords(50)];
};

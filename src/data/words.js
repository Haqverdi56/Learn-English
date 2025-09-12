export const wordsData = [
	{
		id: '1',
		english: 'Beautiful',
		azerbaijani: 'Gözəl',
		level: ['A2', 'B1'],
		synonyms: ['Pretty', 'Lovely', 'Attractive', 'Gorgeous'],
		antonyms: ['Ugly', 'Hideous', 'Unattractive'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: '2',
		english: 'Important',
		azerbaijani: 'Vacib',
		level: ['B1'],
		synonyms: ['Significant', 'Crucial', 'Essential', 'Vital'],
		antonyms: ['Unimportant', 'Trivial', 'Insignificant'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: '3',
		english: 'Happiness',
		azerbaijani: 'Xoşbəxtlik',
		level: ['A2'],
		synonyms: ['Joy', 'Bliss', 'Contentment', 'Delight'],
		antonyms: ['Sadness', 'Misery', 'Sorrow'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: '4',
		english: 'Adventure',
		azerbaijani: 'Macəra',
		level: ['B1', 'B2'],
		synonyms: ['Journey', 'Quest', 'Expedition', 'Experience'],
		antonyms: ['Routine', 'Boredom', 'Monotony'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: '5',
		english: 'Knowledge',
		azerbaijani: 'Bilik',
		level: ['B2'],
		synonyms: ['Wisdom', 'Understanding', 'Learning', 'Education'],
		antonyms: ['Ignorance', 'Stupidity', 'Unawareness'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
	{
		id: '6',
		english: 'Creative',
		azerbaijani: 'Yaradıcı',
		level: ['B1'],
		synonyms: ['Innovative', 'Artistic', 'Original', 'Imaginative'],
		antonyms: ['Uncreative', 'Boring', 'Conventional'],
		pronunciation: {
			uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
		},
	},
];

const baseWords = [
	{ english: 'Success', azerbaijani: 'Uğur', level: ['B1'] },
	{ english: 'Challenge', azerbaijani: 'Çətinlik', level: ['B2'] },
	{ english: 'Dream', azerbaijani: 'Yuxu', level: ['A2'] },
	{ english: 'Future', azerbaijani: 'Gələcək', level: ['B1'] },
	{ english: 'Hope', azerbaijani: 'Ümid', level: ['A2'] },
	{ english: 'Peace', azerbaijani: 'Sülh', level: ['B1'] },
	{ english: 'Freedom', azerbaijani: 'Azadlıq', level: ['B2'] },
	{ english: 'Love', azerbaijani: 'Sevgi', level: ['A1'] },
	{ english: 'Friendship', azerbaijani: 'Dostluq', level: ['A2'] },
	{ english: 'Courage', azerbaijani: 'Cəsarət', level: ['B2'] },
	{ english: 'Wisdom', azerbaijani: 'Hikmət', level: ['C1'] },
	{ english: 'Patience', azerbaijani: 'Səbir', level: ['B1'] },
	{ english: 'Kindness', azerbaijani: 'Mərhəmət', level: ['A2'] },
	{ english: 'Strength', azerbaijani: 'Güc', level: ['B1'] },
	{ english: 'Victory', azerbaijani: 'Qələbə', level: ['B2'] },
];

let generatedCount = 0;

export const generateMoreWords = (count) => {
	const newWords = [];

	for (let i = 0; i < count; i++) {
		const baseIndex = generatedCount % baseWords.length;
		const baseWord = baseWords[baseIndex];

		const newWord = {
			id: `generated-${generatedCount + 1}`,
			english: baseWord.english,
			azerbaijani: baseWord.azerbaijani,
			level: baseWord.level,
			synonyms: ['Great', 'Amazing', 'Wonderful'],
			antonyms: ['Bad', 'Terrible', 'Awful'],
			pronunciation: {
				uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
				us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			},
		};

		newWords.push(newWord);
		generatedCount++;
	}

	return newWords;
};

export const getAllWords = () => {
	return [...wordsData, ...generateMoreWords(50)];
};

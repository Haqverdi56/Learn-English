export const grammarData = [
	{
		id: 'grammar-1',
		title: 'Present Simple Tense',
		level: 'A1',
		category: 'Tenses',
		description: 'Learn how to use present simple tense for daily routines and facts',
		content: {
			explanation: 'The Present Simple tense is used to describe habits, general truths, and repeated actions.',
			rules: [
				'For positive sentences: Subject + base verb (+ s/es for he/she/it)',
				'For negative sentences: Subject + do/does + not + base verb',
				'For questions: Do/Does + subject + base verb?',
			],
			examples: [
				{ english: 'I work every day.', azerbaijani: 'Mən hər gün işləyirəm.' },
				{ english: "She doesn't like coffee.", azerbaijani: 'O qəhvəni sevmir.' },
				{ english: 'Do you speak English?', azerbaijani: 'Siz ingilis dili danışırsınız?' },
			],
		},
	},
	{
		id: 'grammar-2',
		title: 'Present Continuous Tense',
		level: 'A1',
		category: 'Tenses',
		description: 'Learn how to express actions happening now',
		content: {
			explanation: 'The Present Continuous tense is used to describe actions happening right now or temporary situations.',
			rules: [
				'Positive: Subject + am/is/are + verb + ing',
				'Negative: Subject + am/is/are + not + verb + ing',
				'Question: Am/Is/Are + subject + verb + ing?',
			],
			examples: [
				{ english: 'I am reading a book.', azerbaijani: 'Mən kitab oxuyuram.' },
				{ english: 'They are not working today.', azerbaijani: 'Onlar bu gün işləmirlər.' },
				{ english: 'Is she coming to the party?', azerbaijani: 'O, məclisə gəlir?' },
			],
		},
	},
	{
		id: 'grammar-3',
		title: 'Past Simple Tense',
		level: 'A2',
		category: 'Tenses',
		description: 'Learn how to talk about completed actions in the past',
		content: {
			explanation: 'The Past Simple tense is used to describe completed actions in the past.',
			rules: [
				'Regular verbs: add -ed to the base form',
				'Irregular verbs: use the past form (go → went, see → saw)',
				'Negative: Subject + did not + base verb',
				'Question: Did + subject + base verb?',
			],
			examples: [
				{ english: 'I visited my grandmother yesterday.', azerbaijani: 'Dünən nənəmi ziyarət etdim.' },
				{ english: "He didn't go to school.", azerbaijani: 'O məktəbə getmədi.' },
				{ english: 'Did you watch the movie?', azerbaijani: 'Filmi izlədin?' },
			],
		},
	},
	{
		id: 'grammar-4',
		title: 'Articles (a, an, the)',
		level: 'A1',
		category: 'Grammar Rules',
		description: 'Learn when and how to use articles correctly',
		content: {
			explanation: 'Articles are words that define nouns as specific or unspecific.',
			rules: [
				'Use "a" before consonant sounds',
				'Use "an" before vowel sounds',
				'Use "the" for specific nouns',
				'No article for general plural nouns',
			],
			examples: [
				{ english: 'I have a car.', azerbaijani: 'Mənim maşınım var.' },
				{ english: 'She is an engineer.', azerbaijani: 'O mühəndisdir.' },
				{ english: 'The book is on the table.', azerbaijani: 'Kitab stolun üstündədir.' },
			],
		},
	},
	{
		id: 'grammar-5',
		title: 'Modal Verbs (can, could, should)',
		level: 'B1',
		category: 'Modal Verbs',
		description: 'Learn how to express ability, possibility, and advice',
		content: {
			explanation: 'Modal verbs are auxiliary verbs that express necessity, possibility, permission, or ability.',
			rules: [
				'Can: ability or permission',
				'Could: past ability or polite requests',
				'Should: advice or recommendation',
				'Modal + base verb (no to)',
			],
			examples: [
				{ english: 'I can swim very well.', azerbaijani: 'Mən çox yaxşı üzə bilirəm.' },
				{ english: 'Could you help me?', azerbaijani: 'Mənə kömək edə bilərsiniz?' },
				{ english: 'You should study more.', azerbaijani: 'Daha çox oxumalısan.' },
			],
		},
	},
	{
		id: 'grammar-6',
		title: 'Conditional Sentences (Type 1)',
		level: 'B1',
		category: 'Conditionals',
		description: 'Learn how to express real possibilities in the future',
		content: {
			explanation: 'First conditional is used to talk about real and possible situations in the future.',
			rules: ['If + present simple, will + base verb', 'Can also use: unless, when, as soon as', 'The if-clause can come first or second'],
			examples: [
				{ english: 'If it rains, I will stay home.', azerbaijani: 'Yağış yağsa, evdə qalacam.' },
				{ english: 'I will call you if I have time.', azerbaijani: 'Vaxtım olsa, sənə zəng edəcəm.' },
				{ english: 'Unless you hurry, you will be late.', azerbaijani: 'Tələsməsən, gecikəcəksən.' },
			],
		},
	},
	{
		id: 'grammar-7',
		title: 'Present Perfect Tense',
		level: 'B1',
		category: 'Tenses',
		description: 'Learn how to connect past actions with the present',
		content: {
			explanation: 'Present Perfect connects past actions or experiences with the present moment.',
			rules: [
				'Have/Has + past participle',
				'Used for experiences, unfinished actions, recent actions',
				'Time expressions: ever, never, already, yet, just',
			],
			examples: [
				{ english: 'I have visited Paris twice.', azerbaijani: 'Mən Parisə iki dəfə getmişəm.' },
				{ english: "She hasn't finished her homework yet.", azerbaijani: 'O hələ ev tapşırığını bitirməyib.' },
				{ english: 'Have you ever been to Japan?', azerbaijani: 'Heç Yaponiyada olmusan?' },
			],
		},
	},
	{
		id: 'grammar-8',
		title: 'Passive Voice',
		level: 'B2',
		category: 'Voice',
		description: 'Learn how to use passive voice in different tenses',
		content: {
			explanation: 'Passive voice is used when the focus is on the action rather than who performs it.',
			rules: [
				'Be + past participle',
				'Present: am/is/are + past participle',
				'Past: was/were + past participle',
				'Future: will be + past participle',
			],
			examples: [
				{ english: 'The house was built in 1990.', azerbaijani: 'Ev 1990-cı ildə tikilmişdir.' },
				{ english: 'English is spoken worldwide.', azerbaijani: 'İngilis dili bütün dünyada danışılır.' },
				{ english: 'The project will be completed next month.', azerbaijani: 'Layihə gələn ay tamamlanacaq.' },
			],
		},
	},
];

export const getGrammarByLevel = (level) => {
	return grammarData.filter((item) => item.level === level);
};

export const getGrammarByCategory = (category) => {
	return grammarData.filter((item) => item.category === category);
};

export const getAllGrammarLevels = () => {
	return ['A1', 'A2', 'B1', 'B2', 'C1'];
};

export const getAllGrammarCategories = () => {
	const categories = [...new Set(grammarData.map((item) => item.category))];
	return categories;
};

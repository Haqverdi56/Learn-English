export const levelTestData = {
	A1: [
		{
			id: 'a1-1',
			question: 'What is your name?',
			questionAz: 'Adınız nədir?',
			options: [
				{ text: 'My name is John', textAz: 'Mənim adım Johndur' },
				{ text: 'I am 25 years old', textAz: 'Mən 25 yaşındayam' },
				{ text: 'I live in Baku', textAz: 'Mən Bakıda yaşayıram' },
				{ text: 'I like coffee', textAz: 'Mən qəhvəni sevirəm' }
			],
			correct: 0,
			explanation: 'When someone asks "What is your name?", the correct response is "My name is..."',
			explanationAz: '"What is your name?" sualına cavab "My name is..." olmalıdır'
		},
		{
			id: 'a1-2',
			question: 'Choose the correct form: "I _____ a student."',
			questionAz: 'Düzgün formanı seçin: "I _____ a student."',
			options: [
				{ text: 'am', textAz: 'am' },
				{ text: 'is', textAz: 'is' },
				{ text: 'are', textAz: 'are' },
				{ text: 'be', textAz: 'be' }
			],
			correct: 0,
			explanation: 'With "I", we always use "am"',
			explanationAz: '"I" ilə həmişə "am" istifadə edirik'
		},
		{
			id: 'a1-3',
			question: 'What time is it? (3:30)',
			questionAz: 'Saat neçədir? (3:30)',
			options: [
				{ text: 'It is three thirty', textAz: 'Saat üç otuz' },
				{ text: 'It is four thirty', textAz: 'Saat dörd otuz' },
				{ text: 'It is two thirty', textAz: 'Saat iki otuz' },
				{ text: 'It is five thirty', textAz: 'Saat beş otuz' }
			],
			correct: 0,
			explanation: '3:30 is read as "three thirty"',
			explanationAz: '3:30 "three thirty" kimi oxunur'
		}
	],
	A2: [
		{
			id: 'a2-1',
			question: 'I _____ to the cinema yesterday.',
			questionAz: 'Dünən kinoya _____.',
			options: [
				{ text: 'go', textAz: 'gedirəm' },
				{ text: 'went', textAz: 'getdim' },
				{ text: 'going', textAz: 'gedirəm' },
				{ text: 'will go', textAz: 'gedəcəyəm' }
			],
			correct: 1,
			explanation: 'For past actions, we use past tense. "Go" becomes "went"',
			explanationAz: 'Keçmiş hərəkətlər üçün past tense istifadə edirik. "Go" "went" olur'
		},
		{
			id: 'a2-2',
			question: 'She is _____ than her sister.',
			questionAz: 'O bacısından daha _____.',
			options: [
				{ text: 'tall', textAz: 'hündür' },
				{ text: 'taller', textAz: 'daha hündür' },
				{ text: 'tallest', textAz: 'ən hündür' },
				{ text: 'more tall', textAz: 'daha hündür' }
			],
			correct: 1,
			explanation: 'For comparisons, we add "-er" to short adjectives',
			explanationAz: 'Müqayisə üçün qısa sifətlərə "-er" əlavə edirik'
		}
	],
	B1: [
		{
			id: 'b1-1',
			question: 'If I _____ rich, I would travel around the world.',
			questionAz: 'Əgər zəngin _____, dünya gəzərdim.',
			options: [
				{ text: 'am', textAz: 'olsam' },
				{ text: 'was', textAz: 'olsaydım' },
				{ text: 'were', textAz: 'olsaydım' },
				{ text: 'will be', textAz: 'olacağam' }
			],
			correct: 2,
			explanation: 'In second conditional, we use "were" for all persons after "if"',
			explanationAz: 'İkinci şərti cümlələrdə "if"dən sonra bütün şəxslər üçün "were" istifadə edirik'
		},
		{
			id: 'b1-2',
			question: 'The book _____ by millions of people.',
			questionAz: 'Kitab milyonlarla insan tərəfindən _____.',
			options: [
				{ text: 'reads', textAz: 'oxunur' },
				{ text: 'is read', textAz: 'oxunur' },
				{ text: 'reading', textAz: 'oxunur' },
				{ text: 'read', textAz: 'oxunur' }
			],
			correct: 1,
			explanation: 'This is passive voice. We use "is/are + past participle"',
			explanationAz: 'Bu məchul növdür. "is/are + past participle" istifadə edirik'
		}
	],
	B2: [
		{
			id: 'b2-1',
			question: 'I wish I _____ more time to study.',
			questionAz: 'Kaş daha çox oxumaq üçün vaxtım _____.',
			options: [
				{ text: 'have', textAz: 'olsaydı' },
				{ text: 'had', textAz: 'olsaydı' },
				{ text: 'will have', textAz: 'olacaq' },
				{ text: 'would have', textAz: 'olardı' }
			],
			correct: 1,
			explanation: 'After "I wish" for present situations, we use past tense',
			explanationAz: '"I wish"dən sonra indiki vəziyyət üçün past tense istifadə edirik'
		}
	],
	C1: [
		{
			id: 'c1-1',
			question: 'Had I known about the meeting, I _____ attended.',
			questionAz: 'Görüşdən xəbərim olsaydı, _____.',
			options: [
				{ text: 'would', textAz: 'gedərdim' },
				{ text: 'would have', textAz: 'gedərdim' },
				{ text: 'will', textAz: 'gedəcəyəm' },
				{ text: 'had', textAz: 'getmişdim' }
			],
			correct: 1,
			explanation: 'This is third conditional with inversion. We use "would have + past participle"',
			explanationAz: 'Bu inversiya ilə üçüncü şərti cümlədir. "would have + past participle" istifadə edirik'
		}
	]
};

export const getLevelQuestions = (level) => {
	return levelTestData[level] || [];
};

export const getAllLevels = () => {
	return Object.keys(levelTestData);
};

export const calculateLevel = (results) => {
	const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
	let currentLevel = 'A1';
	
	for (const level of levels) {
		const levelResults = results[level];
		if (!levelResults) continue;
		
		const correctAnswers = levelResults.filter(r => r.correct).length;
		const totalQuestions = levelResults.length;
		const percentage = (correctAnswers / totalQuestions) * 100;
		
		if (percentage >= 70) {
			currentLevel = level;
		} else {
			break;
		}
	}
	
	return currentLevel;
};
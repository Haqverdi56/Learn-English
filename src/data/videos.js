export const videosData = [
	{
		id: 'video-1',
		title: 'Daily Conversation',
		level: 'A2',
		duration: 30,
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
		transcript: [
			{
				start: 0,
				end: 3,
				text: 'Good morning! How are you today?',
				translation: 'Sabahınız xeyir! Bu gün necəsiniz?'
			},
			{
				start: 3,
				end: 6,
				text: 'I am fine, thank you. And you?',
				translation: 'Yaxşıyam, təşəkkür edirəm. Siz necəsiniz?'
			},
			{
				start: 6,
				end: 9,
				text: 'I am doing great. What are your plans for today?',
				translation: 'Çox yaxşıyam. Bu gün üçün planlarınız nədir?'
			}
		],
		questions: [
			{
				id: 'q1',
				time: 3,
				question: 'What did the first person say?',
				options: [
					'Good morning! How are you today?',
					'Good evening! How are you today?',
					'Good afternoon! How are you today?',
					'Hello! How are you today?'
				],
				correct: 0
			},
			{
				id: 'q2',
				time: 6,
				question: 'How did the second person respond?',
				options: [
					'I am bad, thank you.',
					'I am fine, thank you. And you?',
					'I am okay, thanks.',
					'I am tired, thank you.'
				],
				correct: 1
			}
		]
	},
	{
		id: 'video-2',
		title: 'At the Restaurant',
		level: 'B1',
		duration: 45,
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
		thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
		transcript: [
			{
				start: 0,
				end: 4,
				text: 'Welcome to our restaurant. Do you have a reservation?',
				translation: 'Restoranımıza xoş gəlmisiniz. Rezervasiyanız varmı?'
			},
			{
				start: 4,
				end: 7,
				text: 'Yes, I have a reservation for two under the name Smith.',
				translation: 'Bəli, Smith adına iki nəfərlik rezervasiyam var.'
			},
			{
				start: 7,
				end: 10,
				text: 'Perfect! Please follow me to your table.',
				translation: 'Mükəmməl! Zəhmət olmasa masanıza qədər məni izləyin.'
			}
		],
		questions: [
			{
				id: 'q3',
				time: 4,
				question: 'What did the waiter ask?',
				options: [
					'Do you have a menu?',
					'Do you have a reservation?',
					'Do you have money?',
					'Do you have time?'
				],
				correct: 1
			}
		]
	},
	{
		id: 'video-3',
		title: 'Shopping Experience',
		level: 'A2',
		duration: 35,
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
		thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
		transcript: [
			{
				start: 0,
				end: 3,
				text: 'Excuse me, where can I find the shoes section?',
				translation: 'Bağışlayın, ayaqqabı bölməsini haradan tapa bilərəm?'
			},
			{
				start: 3,
				end: 6,
				text: 'The shoes are on the second floor, next to the clothing department.',
				translation: 'Ayaqqabılar ikinci mərtəbədə, geyim bölməsinin yanındadır.'
			}
		],
		questions: [
			{
				id: 'q4',
				time: 3,
				question: 'What is the person looking for?',
				options: [
					'Clothes section',
					'Shoes section',
					'Food section',
					'Electronics section'
				],
				correct: 1
			}
		]
	},
	{
		id: 'video-4',
		title: 'Job Interview',
		level: 'B2',
		duration: 60,
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
		thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
		transcript: [
			{
				start: 0,
				end: 4,
				text: 'Tell me about your previous work experience.',
				translation: 'Əvvəlki iş təcrübəniz haqqında danışın.'
			},
			{
				start: 4,
				end: 8,
				text: 'I worked as a marketing manager for three years at ABC Company.',
				translation: 'ABC şirkətində üç il marketinq meneceri kimi işləmişəm.'
			}
		],
		questions: [
			{
				id: 'q5',
				time: 4,
				question: 'What did the interviewer ask about?',
				options: [
					'Education background',
					'Previous work experience',
					'Salary expectations',
					'Personal hobbies'
				],
				correct: 1
			}
		]
	},
	{
		id: 'video-5',
		title: 'Weather Conversation',
		level: 'A1',
		duration: 25,
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
		thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
		transcript: [
			{
				start: 0,
				end: 3,
				text: 'It is a beautiful day today, isn\'t it?',
				translation: 'Bu gün gözəl gündür, elə deyilmi?'
			},
			{
				start: 3,
				end: 6,
				text: 'Yes, the weather is perfect for a walk in the park.',
				translation: 'Bəli, hava parkda gəzinti üçün mükəmməldir.'
			}
		],
		questions: [
			{
				id: 'q6',
				time: 3,
				question: 'How is the weather today?',
				options: [
					'It is raining',
					'It is snowing',
					'It is a beautiful day',
					'It is very cold'
				],
				correct: 2
			}
		]
	}
];

export const getVideosByLevel = (level) => {
	return videosData.filter(video => video.level === level);
};

export const getAllVideoLevels = () => {
	return ['A1', 'A2', 'B1', 'B2', 'C1'];
};
export const skillsData = {
	listening: [
		{
			id: 'listening-a1-1',
			level: 'A1',
			title: 'Basic Greetings',
			description: 'Learn to understand simple greetings and introductions',
			tasks: [
				{
					id: 'task-1',
					type: 'audio',
					question: 'Listen and choose the correct greeting',
					audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
					options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
					correct: 0,
				},
				{
					id: 'task-2',
					type: 'audio',
					question: "What is the person's name?",
					audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
					options: ['John', 'Jane', 'Mike', 'Sarah'],
					correct: 1,
				},
			],
		},
		{
			id: 'listening-a1-2',
			level: 'A1',
			title: 'Numbers and Time',
			description: 'Practice listening to numbers and time expressions',
			tasks: [
				{
					id: 'task-3',
					type: 'audio',
					question: 'What time is it?',
					audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
					options: ['3:00', '3:30', '4:00', '4:30'],
					correct: 1,
				},
			],
		},
		{
			id: 'listening-b1-1',
			level: 'B1',
			title: 'Daily Conversations',
			description: 'Understand conversations about daily activities',
			tasks: [
				{
					id: 'task-4',
					type: 'audio',
					question: 'Where is the conversation taking place?',
					audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
					options: ['Restaurant', 'Hospital', 'School', 'Bank'],
					correct: 0,
				},
			],
		},
	],
	reading: [
		{
			id: 'reading-a1-1',
			level: 'A1',
			title: 'Simple Texts',
			description: 'Read and understand basic information',
			tasks: [
				{
					id: 'task-5',
					type: 'text',
					question: "Read the text and answer: What is John's job?",
					text: 'My name is John. I am 25 years old. I work as a teacher in a primary school. I love my job because I like working with children.',
					options: ['Doctor', 'Teacher', 'Engineer', 'Driver'],
					correct: 1,
				},
			],
		},
		{
			id: 'reading-b1-1',
			level: 'B1',
			title: 'News Articles',
			description: 'Read and comprehend simple news articles',
			tasks: [
				{
					id: 'task-6',
					type: 'text',
					question: 'What is the main topic of the article?',
					text: 'Scientists have discovered a new species of butterfly in the Amazon rainforest. The butterfly has unique patterns on its wings that help it camouflage among the leaves.',
					options: ['Amazon rainforest', 'New butterfly species', 'Wing patterns', 'Scientists'],
					correct: 1,
				},
			],
		},
	],
	writing: [
		{
			id: 'writing-a1-1',
			level: 'A1',
			title: 'Personal Information',
			description: 'Write basic personal information',
			tasks: [
				{
					id: 'task-7',
					type: 'writing',
					question: 'Write a short paragraph about yourself (name, age, job, hobbies)',
					placeholder: 'My name is...',
					minWords: 30,
				},
			],
		},
		{
			id: 'writing-b1-1',
			level: 'B1',
			title: 'Formal Letters',
			description: 'Learn to write formal letters and emails',
			tasks: [
				{
					id: 'task-8',
					type: 'writing',
					question: 'Write a formal email to your teacher asking for an extension on your assignment',
					placeholder: 'Dear Teacher...',
					minWords: 80,
				},
			],
		},
	],
	speaking: [
		{
			id: 'speaking-a1-1',
			level: 'A1',
			title: 'Self Introduction',
			description: 'Practice introducing yourself',
			tasks: [
				{
					id: 'task-9',
					type: 'speaking',
					question: "Record yourself introducing yourself (name, age, where you're from)",
					prompts: ['What is your name?', 'How old are you?', 'Where are you from?', 'What do you do?'],
				},
			],
		},
		{
			id: 'speaking-b1-1',
			level: 'B1',
			title: 'Describing Pictures',
			description: 'Practice describing what you see in pictures',
			tasks: [
				{
					id: 'task-10',
					type: 'speaking',
					question: 'Look at the picture and describe what you see',
					imageUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=400',
					prompts: ['What do you see in the picture?', 'Describe the colors', 'What is happening?'],
				},
			],
		},
	],
};

export const getSkillsByType = (skillType) => {
	return skillsData[skillType] || [];
};

export const getSkillsByLevel = (skillType, level) => {
	const skills = skillsData[skillType] || [];
	return skills.filter((skill) => skill.level === level);
};

export const getAllSkillLevels = () => {
	return ['A1', 'A2', 'B1', 'B2', 'C1'];
};

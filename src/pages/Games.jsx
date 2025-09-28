import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Target, Shuffle, Volume2, CircleCheck as CheckCircle, Circle as XCircle, RotateCcw } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../store/slices/languageSlice';

const Games = () => {
	const [selectedGame, setSelectedGame] = useState('translate');
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [userAnswer, setUserAnswer] = useState('');
	const [showResult, setShowResult] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	const currentLanguage = useSelector(selectCurrentLanguage);

	const games = [
		{
			id: 'translate',
			title: currentLanguage === 'az' ? 'Azərbaycanca düşün, İngiliscəyə çevir' : 'Think in Azerbaijani, Translate to English',
			description: currentLanguage === 'az' ? 'Azərbaycan sözlərini İngilis dilinə tərcümə edin' : 'Translate Azerbaijani words to English',
			icon: Target,
			color: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'find-error',
			title: currentLanguage === 'az' ? 'Səhv Tap' : 'Find the Error',
			description: currentLanguage === 'az' ? 'Cümlədəki səhvi tapın və düzəldin' : 'Find and correct the error in the sentence',
			icon: CheckCircle,
			color: 'from-red-500 to-pink-500',
		},
		{
			id: 'sentence-builder',
			title: currentLanguage === 'az' ? 'Cümlə Qur' : 'Build Sentences',
			description: currentLanguage === 'az' ? 'Qarışıq sözlərdən düzgün cümlə qurun' : 'Build correct sentences from mixed words',
			icon: Shuffle,
			color: 'from-green-500 to-emerald-500',
		},
		{
			id: 'listen-complete',
			title: currentLanguage === 'az' ? 'Dinlə və Tamamla' : 'Listen and Complete',
			description: currentLanguage === 'az' ? 'Cümləni dinləyin və boşluqları doldurun' : 'Listen to the sentence and fill in the blanks',
			icon: Volume2,
			color: 'from-purple-500 to-indigo-500',
		},
	];

	// Mock data for games
	const translateQuestions = [
		{ az: 'Kitab', en: 'book', options: ['book', 'pen', 'table', 'chair'] },
		{ az: 'Ev', en: 'house', options: ['house', 'car', 'tree', 'dog'] },
		{ az: 'Su', en: 'water', options: ['water', 'fire', 'air', 'earth'] },
		{ az: 'Günəş', en: 'sun', options: ['sun', 'moon', 'star', 'cloud'] },
	];

	const errorQuestions = [
		{ 
			sentence: 'I am go to school every day.',
			correct: 'I go to school every day.',
			error: 'am go',
			correction: 'go'
		},
		{
			sentence: 'She have a beautiful car.',
			correct: 'She has a beautiful car.',
			error: 'have',
			correction: 'has'
		},
		{
			sentence: 'They is playing football.',
			correct: 'They are playing football.',
			error: 'is',
			correction: 'are'
		},
	];

	const sentenceQuestions = [
		{
			words: ['I', 'love', 'reading', 'books'],
			correct: 'I love reading books',
		},
		{
			words: ['She', 'is', 'a', 'teacher'],
			correct: 'She is a teacher',
		},
		{
			words: ['We', 'are', 'learning', 'English'],
			correct: 'We are learning English',
		},
	];

	const listenQuestions = [
		{
			sentence: 'I ___ to the market yesterday.',
			audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			correct: 'went',
			options: ['go', 'went', 'going', 'goes']
		},
		{
			sentence: 'She ___ a beautiful song.',
			audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			correct: 'sings',
			options: ['sing', 'sings', 'singing', 'sang']
		},
	];

	const getCurrentQuestions = () => {
		switch (selectedGame) {
			case 'translate': return translateQuestions;
			case 'find-error': return errorQuestions;
			case 'sentence-builder': return sentenceQuestions;
			case 'listen-complete': return listenQuestions;
			default: return translateQuestions;
		}
	};

	const handleAnswer = (answer) => {
		const questions = getCurrentQuestions();
		const question = questions[currentQuestion];
		let correct = false;

		switch (selectedGame) {
			case 'translate':
				correct = answer === question.en;
				break;
			case 'az-to-en':
				correct = answer === question.correct;
				break;
			case 'find-error':
				correct = answer.toLowerCase().includes(question.correction.toLowerCase());
				break;
			case 'sentence-builder':
				correct = answer.toLowerCase() === question.correct.toLowerCase();
				break;
			case 'listen-complete':
				correct = answer === question.correct;
				break;
		}

		setIsCorrect(correct);
		setShowResult(true);
		if (correct) setScore(score + 1);

		setTimeout(() => {
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(currentQuestion + 1);
				setUserAnswer('');
				setShowResult(false);
			} else {
				// Game finished
				alert(`Game finished! Score: ${score + (correct ? 1 : 0)}/${questions.length}`);
				resetGame();
			}
		}, 2000);
	};

	const resetGame = () => {
		setCurrentQuestion(0);
		setScore(0);
		setGameStarted(false);
		setUserAnswer('');
		setShowResult(false);
	};

	const renderGameContent = () => {
		if (!gameStarted) {
			return (
				<div className='text-center py-12'>
					<div className='text-6xl mb-6'>🎮</div>
					<h3 className='text-2xl font-bold text-gray-800 mb-4'>
						{games.find(g => g.id === selectedGame)?.title}
					</h3>
					<p className='text-gray-600 mb-8'>
						{games.find(g => g.id === selectedGame)?.description}
					</p>
					<button
						onClick={() => setGameStarted(true)}
						className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl'
					>
						{currentLanguage === 'az' ? 'Oyuna Başla' : 'Start Game'}
					</button>
				</div>
			);
		}

		const questions = getCurrentQuestions();
		const question = questions[currentQuestion];

		switch (selectedGame) {
			case 'translate':
				return (
					<div className='space-y-6'>
						<div className='text-center'>
							<h3 className='text-2xl font-bold text-gray-800 mb-2'>
								{currentLanguage === 'az' ? 'Bu sözü tərcümə edin:' : 'Translate this word:'}
							</h3>
							<div className='text-4xl font-bold text-blue-600 mb-6'>{question.az}</div>
						</div>
						
						<div className='grid grid-cols-2 gap-4'>
							{question.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswer(option)}
									disabled={showResult}
									className={`p-4 rounded-xl border-2 transition-all duration-200 ${
										showResult
											? option === question.en
												? 'bg-green-100 border-green-500 text-green-800'
												: 'bg-gray-100 border-gray-300 text-gray-500'
											: 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
									}`}
								>
									{option}
								</button>
							))}
						</div>
					</div>
				);

			case 'find-error':
				return (
					<div className='space-y-6'>
						<div className='text-center'>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>
								{currentLanguage === 'az' ? 'Bu cümlədəki səhvi tapın:' : 'Find the error in this sentence:'}
							</h3>
							<div className='text-lg bg-red-50 p-4 rounded-lg border border-red-200 mb-6'>
								{question.sentence}
							</div>
						</div>
						
						<div className='text-center'>
							<input
								type='text'
								value={userAnswer}
								onChange={(e) => setUserAnswer(e.target.value)}
								placeholder={currentLanguage === 'az' ? 'Düzgün cümləni yazın...' : 'Write the correct sentence...'}
								className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								disabled={showResult}
							/>
							<button
								onClick={() => handleAnswer(userAnswer)}
								disabled={showResult || !userAnswer.trim()}
								className='mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50'
							>
								{currentLanguage === 'az' ? 'Cavabı Yoxla' : 'Check Answer'}
							</button>
						</div>

						{showResult && (
							<div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
								<div className='flex items-center justify-center mb-2'>
									{isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
									<span className='ml-2 font-medium'>
										{isCorrect ? (currentLanguage === 'az' ? 'Doğru!' : 'Correct!') : (currentLanguage === 'az' ? 'Səhv!' : 'Wrong!')}
									</span>
								</div>
								<p>{currentLanguage === 'az' ? 'Düzgün cavab:' : 'Correct answer:'} {question.correct}</p>
							</div>
						)}
					</div>
				);

			case 'sentence-builder':
				return (
					<div className='space-y-6'>
						<div className='text-center'>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>
								{currentLanguage === 'az' ? 'Bu sözlərdən cümlə qurun:' : 'Build a sentence from these words:'}
							</h3>
							<div className='flex flex-wrap justify-center gap-3 mb-6'>
								{question.words.map((word, index) => (
									<span key={index} className='px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium'>
										{word}
									</span>
								))}
							</div>
						</div>
						
						<div className='text-center'>
							<input
								type='text'
								value={userAnswer}
								onChange={(e) => setUserAnswer(e.target.value)}
								placeholder={currentLanguage === 'az' ? 'Cümləni yazın...' : 'Write the sentence...'}
								className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								disabled={showResult}
							/>
							<button
								onClick={() => handleAnswer(userAnswer)}
								disabled={showResult || !userAnswer.trim()}
								className='mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50'
							>
								{currentLanguage === 'az' ? 'Cavabı Yoxla' : 'Check Answer'}
							</button>
						</div>

						{showResult && (
							<div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
								<div className='flex items-center justify-center mb-2'>
									{isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
									<span className='ml-2 font-medium'>
										{isCorrect ? (currentLanguage === 'az' ? 'Doğru!' : 'Correct!') : (currentLanguage === 'az' ? 'Səhv!' : 'Wrong!')}
									</span>
								</div>
								<p>{currentLanguage === 'az' ? 'Düzgün cavab:' : 'Correct answer:'} {question.correct}</p>
							</div>
						)}
					</div>
				);

			case 'listen-complete':
				return (
					<div className='space-y-6'>
						<div className='text-center'>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>
								{currentLanguage === 'az' ? 'Dinləyin və boşluğu doldurun:' : 'Listen and fill in the blank:'}
							</h3>
							<button
								onClick={() => {
									const audio = new Audio(question.audio);
									audio.play().catch(error => console.log('Audio play failed:', error));
								}}
								className='mb-6 p-4 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors'
							>
								<Volume2 size={24} />
							</button>
							<div className='text-lg bg-gray-50 p-4 rounded-lg mb-6'>
								{question.sentence}
							</div>
						</div>
						
						<div className='grid grid-cols-2 gap-4'>
							{question.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswer(option)}
									disabled={showResult}
									className={`p-4 rounded-xl border-2 transition-all duration-200 ${
										showResult
											? option === question.correct
												? 'bg-green-100 border-green-500 text-green-800'
												: 'bg-gray-100 border-gray-300 text-gray-500'
											: 'bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50'
									}`}
								>
									{option}
								</button>
							))}
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>
						{currentLanguage === 'az' ? 'Oyunlarla Öyrən' : 'Learn with Games'}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Əyləncəli oyunlarla İngilis dilini öyrənin və bacarıqlarınızı inkişaf etdirin.'
							: 'Learn English through fun games and develop your skills.'}
					</p>
				</div>

				<div className='grid lg:grid-cols-4 gap-8'>
					{/* Game Selection */}
					<div className='lg:col-span-1 space-y-4'>
						<h2 className='text-2xl font-bold text-gray-800 mb-6'>
							{currentLanguage === 'az' ? 'Oyunlar' : 'Games'}
						</h2>
						{games.map((game) => (
							<motion.div
								key={game.id}
								whileHover={{ scale: 1.02 }}
								onClick={() => {
									setSelectedGame(game.id);
									resetGame();
								}}
								className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
									selectedGame === game.id
										? `bg-gradient-to-r ${game.color} text-white shadow-lg`
										: 'bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg'
								}`}
							>
								<div className='flex items-center space-x-3 mb-3'>
									<game.icon size={24} />
									<h3 className='font-bold text-sm'>{game.title}</h3>
								</div>
								<p className={`text-xs ${selectedGame === game.id ? 'text-white/90' : 'text-gray-600'}`}>
									{game.description}
								</p>
							</motion.div>
						))}
					</div>

					{/* Game Content */}
					<div className='lg:col-span-3'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 min-h-[600px]'>
							{/* Game Header */}
							{gameStarted && (
								<div className='flex items-center justify-between mb-8'>
									<div className='flex items-center space-x-4'>
										<h2 className='text-2xl font-bold text-gray-800'>
											{games.find(g => g.id === selectedGame)?.title}
										</h2>
										<button
											onClick={resetGame}
											className='p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
										>
											<RotateCcw size={20} />
										</button>
									</div>
									<div className='text-right'>
										<div className='text-sm text-gray-600'>
											{currentLanguage === 'az' ? 'Sual' : 'Question'} {currentQuestion + 1} / {getCurrentQuestions().length}
										</div>
										<div className='text-lg font-bold text-blue-600'>
											{currentLanguage === 'az' ? 'Xal:' : 'Score:'} {score}
										</div>
									</div>
								</div>
							)}

							{/* Game Content */}
							{renderGameContent()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Games;
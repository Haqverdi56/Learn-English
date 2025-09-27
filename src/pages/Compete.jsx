import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Zap, Crown, Target } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../store/slices/languageSlice';

const Compete = () => {
	const [gameMode, setGameMode] = useState('waiting'); // waiting, playing, finished
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [timeLeft, setTimeLeft] = useState(30);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [players, setPlayers] = useState([]);

	const currentLanguage = useSelector(selectCurrentLanguage);

	// Mock multiplayer data
	const mockPlayers = [
		{ id: 1, name: 'Siz', score: 0, avatar: '👤', isYou: true },
		{ id: 2, name: 'Ali Məmmədov', score: 0, avatar: '👨', isYou: false },
		{ id: 3, name: 'Leyla Həsənova', score: 0, avatar: '👩', isYou: false },
		{ id: 4, name: 'Rəşad Əliyev', score: 0, avatar: '👨‍💼', isYou: false },
	];

	const questions = [
		{
			question: 'What is the past tense of "go"?',
			questionAz: '"Go" feilinin keçmiş zamanı nədir?',
			options: ['went', 'gone', 'going', 'goes'],
			correct: 0,
		},
		{
			question: 'Choose the correct article: "___ apple"',
			questionAz: 'Düzgün artikl seçin: "___ apple"',
			options: ['a', 'an', 'the', 'no article'],
			correct: 1,
		},
		{
			question: 'What does "beautiful" mean?',
			questionAz: '"Beautiful" sözünün mənası nədir?',
			options: ['çirkin', 'gözəl', 'böyük', 'kiçik'],
			correct: 1,
		},
		{
			question: 'Complete: "I ___ to school every day"',
			questionAz: 'Tamamlayın: "I ___ to school every day"',
			options: ['go', 'goes', 'going', 'went'],
			correct: 0,
		},
		{
			question: 'What is the plural of "child"?',
			questionAz: '"Child" sözünün cəmi nədir?',
			options: ['childs', 'children', 'childes', 'child'],
			correct: 1,
		},
	];

	useEffect(() => {
		setPlayers(mockPlayers);
	}, []);

	useEffect(() => {
		let timer;
		if (gameMode === 'playing' && timeLeft > 0) {
			timer = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
		} else if (timeLeft === 0 && gameMode === 'playing') {
			handleNextQuestion();
		}
		return () => clearTimeout(timer);
	}, [timeLeft, gameMode]);

	const startGame = () => {
		setGameMode('playing');
		setCurrentQuestion(0);
		setScore(0);
		setTimeLeft(30);
		setSelectedAnswer(null);
		
		// Simulate other players starting
		setPlayers(prev => prev.map(player => ({ ...player, score: 0 })));
	};

	const handleAnswer = (answerIndex) => {
		if (selectedAnswer !== null) return;
		
		setSelectedAnswer(answerIndex);
		const isCorrect = answerIndex === questions[currentQuestion].correct;
		
		if (isCorrect) {
			const points = Math.max(10, timeLeft); // More points for faster answers
			setScore(prev => prev + points);
			
			// Update your score in players list
			setPlayers(prev => prev.map(player => 
				player.isYou ? { ...player, score: player.score + points } : player
			));
		}

		// Simulate other players answering
		setTimeout(() => {
			setPlayers(prev => prev.map(player => {
				if (!player.isYou) {
					const randomPoints = Math.floor(Math.random() * 25) + 5;
					return { ...player, score: player.score + randomPoints };
				}
				return player;
			}));
		}, 1000);

		setTimeout(() => {
			handleNextQuestion();
		}, 2000);
	};

	const handleNextQuestion = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(prev => prev + 1);
			setTimeLeft(30);
			setSelectedAnswer(null);
		} else {
			setGameMode('finished');
		}
	};

	const resetGame = () => {
		setGameMode('waiting');
		setCurrentQuestion(0);
		setScore(0);
		setTimeLeft(30);
		setSelectedAnswer(null);
		setPlayers(mockPlayers);
	};

	const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

	if (gameMode === 'waiting') {
		return (
			<div className='min-h-screen pt-8 pb-16'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6'>
							{currentLanguage === 'az' ? 'Yarış' : 'Compete'}
						</h1>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							{currentLanguage === 'az'
								? 'Digər oyunçularla yarışın və İngilis dili biliyinizi sınayın!'
								: 'Compete with other players and test your English knowledge!'}
						</p>
					</div>

					<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20'>
						<div className='text-center mb-8'>
							<div className='text-6xl mb-6'>🏆</div>
							<h2 className='text-3xl font-bold text-gray-800 mb-4'>
								{currentLanguage === 'az' ? 'Yarışa Hazırsınız?' : 'Ready to Compete?'}
							</h2>
							<p className='text-gray-600 mb-8'>
								{currentLanguage === 'az'
									? '5 sual, 30 saniyə hər sual üçün. Kim daha tez və düzgün cavab verəcək?'
									: '5 questions, 30 seconds per question. Who will answer faster and correctly?'}
							</p>
						</div>

						{/* Waiting Players */}
						<div className='mb-8'>
							<h3 className='text-xl font-bold text-gray-800 mb-4 text-center'>
								{currentLanguage === 'az' ? 'Oyunçular' : 'Players'}
							</h3>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								{mockPlayers.map((player) => (
									<div key={player.id} className={`p-4 rounded-xl text-center ${
										player.isYou ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
									}`}>
										<div className='text-3xl mb-2'>{player.avatar}</div>
										<div className='font-medium text-gray-800'>{player.name}</div>
										{player.isYou && (
											<div className='text-xs text-blue-600 mt-1'>
												{currentLanguage === 'az' ? 'Siz' : 'You'}
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						<div className='text-center'>
							<button
								onClick={startGame}
								className='px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl'
							>
								{currentLanguage === 'az' ? 'Yarışı Başlat' : 'Start Competition'}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (gameMode === 'finished') {
		const yourRank = sortedPlayers.findIndex(p => p.isYou) + 1;
		
		return (
			<div className='min-h-screen pt-8 pb-16'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20'>
						<div className='text-center mb-8'>
							<div className='text-6xl mb-4'>
								{yourRank === 1 ? '🏆' : yourRank === 2 ? '🥈' : yourRank === 3 ? '🥉' : '🎯'}
							</div>
							<h2 className='text-3xl font-bold text-gray-800 mb-2'>
								{currentLanguage === 'az' ? 'Yarış Bitdi!' : 'Competition Finished!'}
							</h2>
							<p className='text-xl text-gray-600'>
								{currentLanguage === 'az' ? `Sizin yeriniz: ${yourRank}` : `Your rank: ${yourRank}`}
							</p>
						</div>

						{/* Final Leaderboard */}
						<div className='space-y-4 mb-8'>
							{sortedPlayers.map((player, index) => (
								<motion.div
									key={player.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className={`flex items-center justify-between p-4 rounded-xl ${
										player.isYou 
											? 'bg-blue-100 border-2 border-blue-500' 
											: 'bg-gray-100'
									}`}
								>
									<div className='flex items-center space-x-4'>
										<div className='text-2xl font-bold text-gray-600'>#{index + 1}</div>
										<div className='text-2xl'>{player.avatar}</div>
										<div>
											<div className='font-bold text-gray-800'>{player.name}</div>
											{player.isYou && (
												<div className='text-sm text-blue-600'>
													{currentLanguage === 'az' ? 'Siz' : 'You'}
												</div>
											)}
										</div>
									</div>
									<div className='text-right'>
										<div className='text-2xl font-bold text-yellow-600'>{player.score}</div>
										<div className='text-sm text-gray-600'>
											{currentLanguage === 'az' ? 'xal' : 'points'}
										</div>
									</div>
								</motion.div>
							))}
						</div>

						<div className='text-center space-x-4'>
							<button
								onClick={resetGame}
								className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200'
							>
								{currentLanguage === 'az' ? 'Yenidən Oyna' : 'Play Again'}
							</button>
							<button
								onClick={() => window.location.href = '/leaderboard'}
								className='px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200'
							>
								{currentLanguage === 'az' ? 'Liderlik Lövhəsi' : 'Leaderboard'}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Playing mode
	const question = questions[currentQuestion];

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid lg:grid-cols-4 gap-8'>
					{/* Live Leaderboard */}
					<div className='lg:col-span-1'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 sticky top-24'>
							<h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center'>
								<Trophy size={20} className='mr-2 text-yellow-500' />
								{currentLanguage === 'az' ? 'Canlı Nəticələr' : 'Live Results'}
							</h3>
							<div className='space-y-3'>
								{sortedPlayers.map((player, index) => (
									<div key={player.id} className={`flex items-center justify-between p-3 rounded-lg ${
										player.isYou ? 'bg-blue-100' : 'bg-gray-50'
									}`}>
										<div className='flex items-center space-x-2'>
											<span className='text-sm font-bold'>#{index + 1}</span>
											<span className='text-lg'>{player.avatar}</span>
											<span className='text-sm font-medium truncate'>{player.name}</span>
										</div>
										<span className='font-bold text-yellow-600'>{player.score}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Game Area */}
					<div className='lg:col-span-3'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20'>
							{/* Game Header */}
							<div className='flex items-center justify-between mb-8'>
								<div className='flex items-center space-x-4'>
									<div className='text-sm text-gray-600'>
										{currentLanguage === 'az' ? 'Sual' : 'Question'} {currentQuestion + 1} / {questions.length}
									</div>
								</div>
								<div className='flex items-center space-x-4'>
									<div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
										timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
									}`}>
										<Clock size={20} />
										<span className='font-bold text-xl'>{timeLeft}s</span>
									</div>
								</div>
							</div>

							{/* Progress Bar */}
							<div className='mb-8'>
								<div className='w-full bg-gray-200 rounded-full h-2'>
									<div 
										className='bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300'
										style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
									></div>
								</div>
							</div>

							{/* Question */}
							<div className='text-center mb-8'>
								<h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
									{currentLanguage === 'az' ? question.questionAz : question.question}
								</h2>
							</div>

							{/* Answer Options */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{question.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswer(index)}
										disabled={selectedAnswer !== null}
										className={`p-6 text-left rounded-xl border-2 transition-all duration-200 ${
											selectedAnswer === null
												? 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'
												: selectedAnswer === index
												? index === question.correct
													? 'bg-green-100 border-green-500 text-green-800'
													: 'bg-red-100 border-red-500 text-red-800'
												: index === question.correct
												? 'bg-green-100 border-green-500 text-green-800'
												: 'bg-gray-100 border-gray-300 text-gray-500'
										} disabled:cursor-not-allowed`}
									>
										<div className='flex items-center space-x-3'>
											<span className='w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold'>
												{String.fromCharCode(65 + index)}
											</span>
											<span className='text-lg'>{option}</span>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Compete;
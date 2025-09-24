import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Award, BookOpen } from 'lucide-react';
import { levelTestData, calculateLevel } from '../data/levelTest';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../store/slices/languageSlice';

const LevelTest = () => {
	const [currentLevel, setCurrentLevel] = useState('A1');
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [results, setResults] = useState({});
	const [testCompleted, setTestCompleted] = useState(false);
	const [finalLevel, setFinalLevel] = useState(null);

	const currentLanguage = useSelector(selectCurrentLanguage);
	const theme = useSelector((state) => state.theme.mode);

	const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
	const questions = levelTestData[currentLevel] || [];
	const question = questions[currentQuestion];

	const handleAnswerSelect = (answerIndex) => {
		setSelectedAnswer(answerIndex);
	};

	const handleNextQuestion = () => {
		if (selectedAnswer === null) return;

		const isCorrect = selectedAnswer === question.correct;
		
		// Save result
		const newResults = { ...results };
		if (!newResults[currentLevel]) {
			newResults[currentLevel] = [];
		}
		newResults[currentLevel].push({
			questionId: question.id,
			correct: isCorrect,
			selectedAnswer,
			correctAnswer: question.correct
		});
		setResults(newResults);

		setShowResult(true);

		setTimeout(() => {
			setShowResult(false);
			setSelectedAnswer(null);

			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(currentQuestion + 1);
			} else {
				// Level completed
				const levelResults = newResults[currentLevel];
				const correctAnswers = levelResults.filter(r => r.correct).length;
				const percentage = (correctAnswers / levelResults.length) * 100;

				if (percentage >= 70 && currentLevel !== 'C1') {
					// Move to next level
					const nextLevelIndex = levels.indexOf(currentLevel) + 1;
					setCurrentLevel(levels[nextLevelIndex]);
					setCurrentQuestion(0);
				} else {
					// Test completed
					const calculatedLevel = calculateLevel(newResults);
					setFinalLevel(calculatedLevel);
					setTestCompleted(true);
				}
			}
		}, 2000);
	};

	const resetTest = () => {
		setCurrentLevel('A1');
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowResult(false);
		setResults({});
		setTestCompleted(false);
		setFinalLevel(null);
	};

	const getLevelColor = (level) => {
		switch (level) {
			case 'A1': return 'from-green-500 to-emerald-500';
			case 'A2': return 'from-blue-500 to-cyan-500';
			case 'B1': return 'from-yellow-500 to-orange-500';
			case 'B2': return 'from-orange-500 to-red-500';
			case 'C1': return 'from-red-500 to-pink-500';
			default: return 'from-gray-500 to-gray-600';
		}
	};

	const getLevelDescription = (level) => {
		const descriptions = {
			A1: currentLanguage === 'az' ? 'Başlanğıc səviyyə' : 'Beginner',
			A2: currentLanguage === 'az' ? 'Elementar səviyyə' : 'Elementary',
			B1: currentLanguage === 'az' ? 'Orta səviyyə' : 'Intermediate',
			B2: currentLanguage === 'az' ? 'Yuxarı orta səviyyə' : 'Upper Intermediate',
			C1: currentLanguage === 'az' ? 'İrəliləmiş səviyyə' : 'Advanced'
		};
		return descriptions[level] || level;
	};

	if (testCompleted) {
		return (
			<div className="min-h-screen pt-8 pb-16">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg border text-center ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						}`}
					>
						<div className="mb-8">
							<Award size={64} className="mx-auto text-yellow-500 mb-4" />
							<h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
								{currentLanguage === 'az' ? 'Test Tamamlandı!' : 'Test Completed!'}
							</h1>
							<p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
								{currentLanguage === 'az' ? 'Sizin İngilis dili səviyyəniz:' : 'Your English level is:'}
							</p>
						</div>

						<div className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${getLevelColor(finalLevel)} text-white mb-8`}>
							<div className="text-6xl font-bold mb-2">{finalLevel}</div>
							<div className="text-xl">{getLevelDescription(finalLevel)}</div>
						</div>

						<div className="grid md:grid-cols-3 gap-6 mb-8">
							{Object.entries(results).map(([level, levelResults]) => {
								const correct = levelResults.filter(r => r.correct).length;
								const total = levelResults.length;
								const percentage = Math.round((correct / total) * 100);

								return (
									<div key={level} className={`p-4 rounded-xl border ${
										theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-200'
									}`}>
										<h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
											{level}
										</h3>
										<div className={`text-2xl font-bold mb-1 ${percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
											{percentage}%
										</div>
										<div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
											{correct}/{total} {currentLanguage === 'az' ? 'düzgün' : 'correct'}
										</div>
									</div>
								);
							})}
						</div>

						<button
							onClick={resetTest}
							className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
						>
							<RotateCcw size={20} />
							<span>{currentLanguage === 'az' ? 'Yenidən Test Et' : 'Take Test Again'}</span>
						</button>
					</motion.div>
				</div>
			</div>
		);
	}

	if (!question) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						{currentLanguage === 'az' ? 'Sual tapılmadı' : 'No questions found'}
					</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-8 pb-16">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
						{currentLanguage === 'az' ? 'İngilis Dili Səviyyə Testi' : 'English Level Test'}
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						{currentLanguage === 'az' 
							? 'Suallara cavab verərək İngilis dili səviyyənizi öyrənin'
							: 'Answer questions to discover your English proficiency level'
						}
					</p>
				</div>

				{/* Progress */}
				<div className={`backdrop-blur-sm rounded-xl p-4 mb-8 shadow-lg border ${
					theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
				}`}>
					<div className="flex items-center justify-between mb-2">
						<span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Cari Səviyyə:' : 'Current Level:'} {currentLevel}
						</span>
						<span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
							{currentQuestion + 1} / {questions.length}
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div 
							className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(currentLevel)} transition-all duration-300`}
							style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
						></div>
					</div>
				</div>

				{/* Question */}
				<AnimatePresence mode="wait">
					<motion.div
						key={`${currentLevel}-${currentQuestion}`}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg border ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						}`}
					>
						<h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? question.questionAz : question.question}
						</h2>

						<div className="space-y-4 mb-8">
							{question.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswerSelect(index)}
									disabled={showResult}
									className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
										selectedAnswer === index
											? showResult
												? index === question.correct
													? 'bg-green-100 border-green-500 text-green-800'
													: 'bg-red-100 border-red-500 text-red-800'
												: 'bg-blue-100 border-blue-500 text-blue-800'
											: showResult && index === question.correct
											? 'bg-green-100 border-green-500 text-green-800'
											: theme === 'dark'
											? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50'
											: 'bg-white/50 border-gray-200 hover:bg-white/80'
									} ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
								>
									<div className="flex items-center space-x-3">
										<span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold">
											{String.fromCharCode(65 + index)}
										</span>
										<span>{currentLanguage === 'az' ? option.textAz : option.text}</span>
										{showResult && (
											<div className="ml-auto">
												{index === question.correct ? (
													<CheckCircle size={20} className="text-green-600" />
												) : selectedAnswer === index ? (
													<XCircle size={20} className="text-red-600" />
												) : null}
											</div>
										)}
									</div>
								</button>
							))}
						</div>

						{showResult && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-6"
							>
								<h3 className="font-semibold text-blue-800 mb-2">
									{currentLanguage === 'az' ? 'İzahat:' : 'Explanation:'}
								</h3>
								<p className="text-blue-700">
									{currentLanguage === 'az' ? question.explanationAz : question.explanation}
								</p>
							</motion.div>
						)}

						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-2">
								<BookOpen size={20} className="text-gray-400" />
								<span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
									{getLevelDescription(currentLevel)}
								</span>
							</div>

							<button
								onClick={handleNextQuestion}
								disabled={selectedAnswer === null || showResult}
								className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{showResult 
									? currentLanguage === 'az' ? 'Gözləyin...' : 'Please wait...'
									: currentLanguage === 'az' ? 'Növbəti' : 'Next'
								}
							</button>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default LevelTest;
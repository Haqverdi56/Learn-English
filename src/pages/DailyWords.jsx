import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, Volume2, Check, X, RefreshCw } from 'lucide-react';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { addToLearned, addToUnknown, isLearned, isUnknown } from '../store/slices/vocabularySlice';
import { generateDailyWords, selectTodaysWords, selectHasWordsForToday, selectCanGenerateWords } from '../store/slices/dailyWordsSlice';
import WordDetailModal from '../components/WordDetailModal';

const DailyWords = () => {
	const dispatch = useDispatch();
	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);
	const todaysWords = useSelector(selectTodaysWords);
	const hasWordsForToday = useSelector(selectHasWordsForToday);
	const canGenerateWords = useSelector(selectCanGenerateWords);
	const theme = useSelector((state) => state.theme.mode);

	const [selectedWord, setSelectedWord] = useState(null);
	const [flippedCards, setFlippedCards] = useState(new Set());

	useEffect(() => {
		if (!hasWordsForToday && canGenerateWords) {
			dispatch(generateDailyWords());
		}
	}, [dispatch, hasWordsForToday, canGenerateWords]);

	const handleCardClick = (wordId, event) => {
		event.stopPropagation();
		setFlippedCards((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(wordId)) {
				newSet.delete(wordId);
			} else {
				newSet.add(wordId);
			}
			return newSet;
		});
	};
	const handleOutsideClick = () => {
		setFlippedCards(new Set());
	};

	const playAudio = (audioUrl, event) => {
		event.stopPropagation();
		const audio = new Audio(audioUrl);
		audio.play().catch((error) => console.log('Audio play failed:', error));
	};

	const getLevelColor = (level) => {
		switch (level) {
			case 'A1':
				return 'bg-green-100 text-green-800';
			case 'A2':
				return 'bg-blue-100 text-blue-800';
			case 'B1':
				return 'bg-yellow-100 text-yellow-800';
			case 'B2':
				return 'bg-orange-100 text-orange-800';
			case 'C1':
				return 'bg-red-100 text-red-800';
			case 'C2':
				return 'bg-purple-100 text-purple-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const formatDate = () => {
		const today = new Date();
		return today.toLocaleDateString(currentLanguage === 'az' ? 'az-AZ' : 'en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	if (!canGenerateWords && !hasWordsForToday) {
		return (
			<div className='min-h-screen pt-8 pb-16'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6'>
							{currentLanguage === 'az' ? 'Hər Gün 10' : 'Daily 10'}
						</h1>

						<div
							className={`max-w-md mx-auto p-8 rounded-2xl shadow-lg border ${
								theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
							} backdrop-blur-sm`}
						>
							<Calendar size={64} className='mx-auto text-gray-400 mb-4' />
							<h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
								{currentLanguage === 'az' ? 'Bütün sözlər tükəndi' : 'All Words Completed'}
							</h2>
							<p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
								{currentLanguage === 'az'
									? 'Təbrik edirik! Bütün mövcud sözləri öyrəndiniz. Yeni sözləri gözləyin.'
									: 'Congratulations! You have learned all available words. Please wait for new words.'}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen pt-8 pb-16' onClick={handleOutsideClick}>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4'>
						{currentLanguage === 'az' ? 'Hər Gün 10' : 'Daily 10'}
					</h1>
					<div className='flex items-center justify-center space-x-2 mb-6'>
						<Calendar size={20} className='text-gray-600' />
						<p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{formatDate()}</p>
					</div>
					<p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
						{currentLanguage === 'az'
							? 'Hər gün yeni 10 söz öyrənin və lüğət ehtiyatınızı artırın.'
							: 'Learn 10 new words every day and expand your vocabulary.'}
					</p>
				</div>

				{/* Words Grid */}
				{todaysWords.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
						{todaysWords.map((word, index) => {
							const isFlipped = flippedCards.has(word.id);

							return (
								<motion.div
									key={word.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className='relative h-64 perspective-1000'
									onClick={(e) => handleCardClick(word.id, e)}
								>
									<div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
										{/* Front Side */}
										<div className='absolute inset-0 w-full h-full backface-hidden'>
											<div
												className={`rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col justify-between cursor-pointer group ${
													theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/80 border-white/20'
												} backdrop-blur-sm`}
											>
												<div className='flex-1 flex items-center justify-center'>
													<h3
														className={`text-xl font-semibold text-center group-hover:text-orange-600 transition-colors ${
															theme === 'dark' ? 'text-white' : 'text-gray-800'
														}`}
													>
														{word.english}
													</h3>
												</div>

												<div className='flex flex-wrap gap-1 justify-center mb-4'>
													{word.level.map((level) => (
														<span key={level} className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
															{level}
														</span>
													))}
												</div>

												<div className='flex justify-between items-center'>
													<button
														onClick={(e) => playAudio(word.pronunciation.uk, e)}
														className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
														title='UK Pronunciation'
													>
														<Volume2 size={16} />
													</button>

													<div className='text-xs text-gray-400'>
														<RefreshCw size={14} />
													</div>

													<button
														onClick={(e) => playAudio(word.pronunciation.us, e)}
														className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
														title='US Pronunciation'
													>
														<Volume2 size={16} />
													</button>
												</div>
											</div>
										</div>

										{/* Back Side */}
										<div className='absolute inset-0 w-full h-full backface-hidden rotate-y-180'>
											<div className='bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 shadow-lg p-6 h-full flex flex-col justify-between cursor-pointer'>
												<div className='flex-1 flex items-center justify-center'>
													<h3 className='text-xl font-semibold text-gray-800 text-center'>{word.azerbaijani}</h3>
												</div>

												<div className='flex flex-wrap gap-1 justify-center mb-4'>
													{word.level.map((level) => (
														<span key={level} className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
															{level}
														</span>
													))}
												</div>

												<div className='flex justify-between items-center'>
													<button
														onClick={(e) => {
															e.stopPropagation();
															dispatch(addToLearned(word.id));
														}}
														className={`p-2 rounded-lg transition-colors ${
															useSelector((state) => isLearned(state, word.id)) ? 'bg-green-100 text-green-600' : 'text-green-600 hover:bg-green-50'
														}`}
														title={t.learned}
													>
														<Check size={16} />
													</button>

													<button
														onClick={(e) => {
															e.stopPropagation();
															setSelectedWord(word);
														}}
														className='text-xs text-orange-600 hover:text-orange-800 font-medium'
													>
														Details
													</button>

													<button
														onClick={(e) => {
															e.stopPropagation();
															dispatch(addToUnknown(word.id));
														}}
														className={`p-2 rounded-lg transition-colors ${
															useSelector((state) => isUnknown(state, word.id)) ? 'bg-red-100 text-red-600' : 'text-red-600 hover:bg-red-50'
														}`}
														title={t.unknown}
													>
														<X size={16} />
													</button>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				) : (
					<div className='text-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4'></div>
						<p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
							{currentLanguage === 'az' ? 'Günün sözləri hazırlanır...' : "Preparing today's words..."}
						</p>
					</div>
				)}

				{/* Progress Info */}
				{todaysWords.length > 0 && (
					<div
						className={`mt-12 text-center p-6 rounded-2xl shadow-lg border ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						} backdrop-blur-sm`}
					>
						<h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Bugünün İrəliləyişi' : "Today's Progress"}
						</h3>
						<p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
							{currentLanguage === 'az'
								? `10 sözdən ${todaysWords.length} sözü öyrəndiniz`
								: `You have learned ${todaysWords.length} out of 10 words`}
						</p>
					</div>
				)}
			</div>

			{/* Word Detail Modal */}
			<AnimatePresence>{selectedWord && <WordDetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />}</AnimatePresence>

			<style jsx>{`
				.perspective-1000 {
					perspective: 1000px;
				}
				.preserve-3d {
					transform-style: preserve-3d;
				}
				.backface-hidden {
					backface-visibility: hidden;
				}
				.rotate-y-180 {
					transform: rotateY(180deg);
				}
			`}</style>
		</div>
	);
};

export default DailyWords;

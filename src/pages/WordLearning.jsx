import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCcw, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useVocabulary } from '../contexts/VocabularyContext';
import { wordsData, generateMoreWords } from '../data/words';
import WordDetailModal from '../components/WordDetailModal';

const WordLearning = () => {
	const [words, setWords] = useState(wordsData);
	const [flippedCards, setFlippedCards] = useState(new Set());
	const [displayLanguage, setDisplayLanguage] = useState('az');
	const [selectedWord, setSelectedWord] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedLevels, setSelectedLevels] = useState([]);
	const [hasMoreWords, setHasMoreWords] = useState(true);
	const [loadedWordIds, setLoadedWordIds] = useState(new Set(wordsData.map((w) => w.id)));

	const { currentLanguage, translations } = useLanguage();
	const { addToLearned, addToUnknown, isLearned, isUnknown } = useVocabulary();
	const t = translations[currentLanguage];

	const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

	const filteredWords = selectedLevels.length === 0 ? words : words.filter((word) => word.level.some((level) => selectedLevels.includes(level)));

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

	const loadMoreWords = () => {
		if (loading || !hasMoreWords) return;

		setLoading(true);
		setTimeout(() => {
			const newWords = generateMoreWords(6);
			const uniqueNewWords = newWords.filter((word) => !loadedWordIds.has(word.id));

			if (uniqueNewWords.length === 0) {
				setHasMoreWords(false);
			} else {
				setWords((prev) => [...prev, ...uniqueNewWords]);
				setLoadedWordIds((prev) => new Set([...prev, ...uniqueNewWords.map((w) => w.id)]));
			}

			setLoading(false);
		}, 1000);
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

	return (
		<div className='min-h-screen pt-8 pb-16' onClick={handleOutsideClick}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>
						{t.wordLearning}
					</h1>

					{/* Language Toggle */}
					<div className='flex items-center justify-center space-x-4 mb-8'>
						<span className='text-gray-600 font-medium'>Display Language:</span>
						<div className='bg-white/60 backdrop-blur-sm rounded-full p-1 border border-white/20'>
							<button
								onClick={() => setDisplayLanguage('az')}
								className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
									displayLanguage === 'az' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-gray-600 hover:text-blue-600'
								}`}
							>
								{t.azerbaijani}
							</button>
							<button
								onClick={() => setDisplayLanguage('en')}
								className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
									displayLanguage === 'en' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-gray-600 hover:text-blue-600'
								}`}
							>
								{t.english}
							</button>
						</div>
					</div>

					{/* Level Filter */}
					<div className='flex flex-wrap items-center justify-center gap-2 mb-8'>
						<span className='text-gray-600 font-medium mr-2'>{currentLanguage === 'az' ? 'Səviyyə:' : 'Level:'}</span>
						{allLevels.map((level) => (
							<button
								key={level}
								onClick={() => {
									setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
								}}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
									selectedLevels.includes(level)
										? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
										: 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
								}`}
							>
								{level}
							</button>
						))}
						{selectedLevels.length > 0 && (
							<button
								onClick={() => setSelectedLevels([])}
								className='px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors'
							>
								{currentLanguage === 'az' ? 'Təmizlə' : 'Clear'}
							</button>
						)}
					</div>
				</div>

				{/* Word Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'>
					{filteredWords.map((word) => {
						const isFlipped = flippedCards.has(word.id);
						const frontText = displayLanguage === 'en' ? word.english : word.azerbaijani;
						const backText = displayLanguage === 'en' ? word.azerbaijani : word.english;

						return (
							<motion.div
								key={word.id}
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='relative h-48 perspective-1000'
								onClick={(e) => handleCardClick(word.id, e)}
							>
								<div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
									{/* Front Side */}
									<div className='absolute inset-0 w-full h-full backface-hidden'>
										<div className='bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col justify-between cursor-pointer group'>
											<div className='flex-1 flex items-center justify-center'>
												<h3 className='text-lg font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors'>{frontText}</h3>
											</div>

											{displayLanguage === 'en' && (
												<div className='flex flex-wrap gap-1 justify-center mt-4'>
													{word.level.map((level) => (
														<span key={level} className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
															{level}
														</span>
													))}
												</div>
											)}

											<div className='flex justify-between items-center mt-4'>
												<button
													onClick={(e) => playAudio(word.pronunciation.uk, e)}
													className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
													title='UK Pronunciation'
												>
													<Volume2 size={16} />
												</button>

												<div className='text-xs text-gray-400'>
													<RotateCcw size={14} />
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
										<div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-lg p-6 h-full flex flex-col justify-between cursor-pointer'>
											<div className='flex-1 flex items-center justify-center'>
												<h3 className='text-lg font-semibold text-gray-800 text-center'>{backText}</h3>
											</div>

											{displayLanguage === 'az' && (
												<div className='flex flex-wrap gap-1 justify-center mt-4'>
													{word.level.map((level) => (
														<span key={level} className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
															{level}
														</span>
													))}
												</div>
											)}

											<div className='flex justify-between items-center mt-4'>
												<button
													onClick={(e) => {
														e.stopPropagation();
														addToLearned(word.id);
													}}
													className={`p-2 rounded-lg transition-colors ${
														isLearned(word.id) ? 'bg-green-100 text-green-600' : 'text-green-600 hover:bg-green-50'
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
													className='text-xs text-blue-600 hover:text-blue-800 font-medium'
												>
													Details
												</button>

												<button
													onClick={(e) => {
														e.stopPropagation();
														addToUnknown(word.id);
													}}
													className={`p-2 rounded-lg transition-colors ${
														isUnknown(word.id) ? 'bg-red-100 text-red-600' : 'text-red-600 hover:bg-red-50'
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

				{/* Load More Button */}
				{hasMoreWords && (
					<div className='flex justify-center mt-12'>
						<button
							onClick={loadMoreWords}
							disabled={loading}
							className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? (
								<div className='flex items-center'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
									{currentLanguage === 'az' ? 'Yüklənir...' : 'Loading...'}
								</div>
							) : (
								t.loadMore
							)}
						</button>
					</div>
				)}

				{!hasMoreWords && (
					<div className='text-center mt-12'>
						<p className='text-gray-600'>{currentLanguage === 'az' ? 'Bütün sözlər yükləndi' : 'All words loaded'}</p>
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

export default WordLearning;

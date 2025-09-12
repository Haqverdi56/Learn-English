import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { getAllDictionaryWords } from '../data/dictionary';
import WordDetailModal from '../components/WordDetailModal';

const Dictionary = () => {
	const [words, setWords] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState([]);
	const [selectedLevels, setSelectedLevels] = useState([]);
	const [selectedWord, setSelectedWord] = useState(null);
	const [loading, setLoading] = useState(true);

	const { currentLanguage, translations } = useLanguage();
	const { canAccessPage } = useSubscription();
	const t = translations[currentLanguage];

	const partsOfSpeech = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'interjection'];
	const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

	useEffect(() => {
		if (!canAccessPage('/dictionary')) {
			return;
		}

		// Simulate API call
		setTimeout(() => {
			setWords(getAllDictionaryWords());
			setLoading(false);
		}, 1000);
	}, [canAccessPage]);

	if (!canAccessPage('/dictionary')) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4'>{currentLanguage === 'az' ? 'Premium Funksiya' : 'Premium Feature'}</h2>
					<p className='text-gray-600 mb-6'>
						{currentLanguage === 'az'
							? 'Bu səhifəyə daxil olmaq üçün premium abunəlik lazımdır.'
							: 'Premium subscription required to access this page.'}
					</p>
					<a
						href='/subscription'
						className='px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200'
					>
						{currentLanguage === 'az' ? 'Abunə ol' : 'Subscribe Now'}
					</a>
				</div>
			</div>
		);
	}

	const filteredWords = words.filter((word) => {
		const matchesSearch =
			word.english.toLowerCase().includes(searchTerm.toLowerCase()) || word.azerbaijani.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesPartOfSpeech = selectedPartOfSpeech.length === 0 || selectedPartOfSpeech.includes(word.partOfSpeech);
		const matchesLevel = selectedLevels.length === 0 || word.level.some((level) => selectedLevels.includes(level));

		return matchesSearch && matchesPartOfSpeech && matchesLevel;
	});

	const playAudio = (audioUrl) => {
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

	const getPartOfSpeechColor = (pos) => {
		switch (pos) {
			case 'noun':
				return 'bg-blue-50 text-blue-700';
			case 'verb':
				return 'bg-green-50 text-green-700';
			case 'adjective':
				return 'bg-purple-50 text-purple-700';
			case 'adverb':
				return 'bg-orange-50 text-orange-700';
			default:
				return 'bg-gray-50 text-gray-700';
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		);
	}

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6'>
						{t.dictionary}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Geniş lüğət bazasından istədiyiniz sözü tapın və detallı məlumat əldə edin.'
							: 'Find any word from our comprehensive dictionary and get detailed information.'}
					</p>
				</div>

				{/* Search and Filters */}
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
					{/* Search Bar */}
					<div className='relative mb-6'>
						<Search size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
						<input
							type='text'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder={currentLanguage === 'az' ? 'Söz axtarın...' : 'Search words...'}
							className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
						/>
					</div>

					{/* Filters */}
					<div className='space-y-4'>
						{/* Part of Speech Filter */}
						<div>
							<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Nitq hissəsi:' : 'Part of Speech:'}</h3>
							<div className='flex flex-wrap gap-2'>
								{partsOfSpeech.map((pos) => (
									<button
										key={pos}
										onClick={() => {
											setSelectedPartOfSpeech((prev) => (prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]));
										}}
										className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
											selectedPartOfSpeech.includes(pos)
												? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
												: 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
										}`}
									>
										{t[pos]}
									</button>
								))}
							</div>
						</div>

						{/* Level Filter */}
						<div>
							<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Səviyyə:' : 'Level:'}</h3>
							<div className='flex flex-wrap gap-2'>
								{allLevels.map((level) => (
									<button
										key={level}
										onClick={() => {
											setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
										}}
										className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
											selectedLevels.includes(level)
												? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
												: 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
										}`}
									>
										{level}
									</button>
								))}
							</div>
						</div>

						{/* Clear Filters */}
						{(selectedPartOfSpeech.length > 0 || selectedLevels.length > 0) && (
							<button
								onClick={() => {
									setSelectedPartOfSpeech([]);
									setSelectedLevels([]);
								}}
								className='px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors'
							>
								{currentLanguage === 'az' ? 'Filterləri təmizlə' : 'Clear Filters'}
							</button>
						)}
					</div>
				</div>

				{/* Words Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredWords.map((word, index) => (
						<motion.div
							key={word.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className='bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 cursor-pointer'
							onClick={() => setSelectedWord(word)}
						>
							{/* Header */}
							<div className='flex items-start justify-between mb-4'>
								<div>
									<h3 className='text-xl font-bold text-gray-800 mb-1'>{word.english}</h3>
									<p className='text-gray-600'>{word.azerbaijani}</p>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										playAudio(word.pronunciation.uk);
									}}
									className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
								>
									<Volume2 size={16} />
								</button>
							</div>

							{/* Part of Speech */}
							<div className='mb-3'>
								<span className={`px-2 py-1 text-xs font-medium rounded-full ${getPartOfSpeechColor(word.partOfSpeech)}`}>
									{t[word.partOfSpeech]}
								</span>
							</div>

							{/* Levels */}
							<div className='flex flex-wrap gap-1 mb-3'>
								{word.level.map((level) => (
									<span key={level} className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(level)}`}>
										{level}
									</span>
								))}
							</div>

							{/* Definition */}
							<p className='text-gray-600 text-sm line-clamp-2 mb-3'>{word.definition}</p>

							{/* Example */}
							<p className='text-gray-500 text-sm italic'>"{word.example}"</p>
						</motion.div>
					))}
				</div>

				{filteredWords.length === 0 && (
					<div className='text-center py-12'>
						<p className='text-gray-600 text-lg'>{currentLanguage === 'az' ? 'Heç bir söz tapılmadı' : 'No words found'}</p>
					</div>
				)}
			</div>

			{/* Word Detail Modal */}
			<AnimatePresence>{selectedWord && <WordDetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />}</AnimatePresence>
		</div>
	);
};

export default Dictionary;

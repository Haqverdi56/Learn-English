import React from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, Check, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useVocabulary } from '../contexts/VocabularyContext';

const WordDetailModal = ({ word, onClose }) => {
	const { currentLanguage, translations } = useLanguage();
	const { addToLearned, addToUnknown, isLearned, isUnknown } = useVocabulary();
	const t = translations[currentLanguage];

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

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className='bg-white rounded-2xl max-w-md w-full shadow-2xl'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-gray-100'>
					<h2 className='text-2xl font-bold text-gray-800'>{word.english}</h2>
					<button onClick={onClose} className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
						<X size={20} />
					</button>
				</div>

				{/* Content */}
				<div className='p-6 space-y-6'>
					{/* Translation */}
					<div>
						<h3 className='text-sm font-medium text-gray-500 mb-2'>Translation</h3>
						<p className='text-lg text-gray-800'>{word.azerbaijani}</p>
					</div>

					{/* Levels */}
					<div>
						<h3 className='text-sm font-medium text-gray-500 mb-2'>{t.level}</h3>
						<div className='flex flex-wrap gap-2'>
							{word.level.map((level) => (
								<span key={level} className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(level)}`}>
									{level}
								</span>
							))}
						</div>
					</div>

					{/* Pronunciation */}
					<div>
						<h3 className='text-sm font-medium text-gray-500 mb-3'>Pronunciation</h3>
						<div className='flex space-x-4'>
							<button
								onClick={() => playAudio(word.pronunciation.uk)}
								className='flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors'
							>
								<Volume2 size={16} />
								<span className='font-medium'>UK</span>
							</button>
							<button
								onClick={() => playAudio(word.pronunciation.us)}
								className='flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors'
							>
								<Volume2 size={16} />
								<span className='font-medium'>US</span>
							</button>
						</div>
					</div>

					{/* Synonyms */}
					{word.synonyms.length > 0 && (
						<div>
							<h3 className='text-sm font-medium text-gray-500 mb-2'>{t.synonyms}</h3>
							<div className='flex flex-wrap gap-2'>
								{word.synonyms.map((synonym, index) => (
									<span key={index} className='px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm'>
										{synonym}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Antonyms */}
					{word.antonyms.length > 0 && (
						<div>
							<h3 className='text-sm font-medium text-gray-500 mb-2'>{t.antonyms}</h3>
							<div className='flex flex-wrap gap-2'>
								{word.antonyms.map((antonym, index) => (
									<span key={index} className='px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm'>
										{antonym}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className='flex space-x-3 p-6 bg-gray-50 rounded-b-2xl'>
					<button
						onClick={() => addToLearned(word.id)}
						className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
							isLearned(word.id)
								? 'bg-green-100 text-green-700 border border-green-200'
								: 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
						}`}
					>
						<Check size={16} />
						<span>{t.learned}</span>
					</button>
					<button
						onClick={() => addToUnknown(word.id)}
						className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
							isUnknown(word.id) ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
						}`}
					>
						<Minus size={16} />
						<span>{t.unknown}</span>
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default WordDetailModal;

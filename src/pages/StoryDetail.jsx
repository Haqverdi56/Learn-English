import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowLeft, Volume2, Languages } from 'lucide-react';
import { storiesData } from '../data/stories';
import { useLanguage } from '../contexts/LanguageContext';
import { useVocabulary } from '../contexts/VocabularyContext';
import WordDetailModal from '../components/WordDetailModal';
import { getAllWords } from '../data/words';
import axios from 'axios';

const StoryDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const audioRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [showTranslation, setShowTranslation] = useState(false);
	const [selectedWord, setSelectedWord] = useState(null);
	const [selectedSegment, setSelectedSegment] = useState(null);
	const [allWords, setAllWords] = useState([]);

	const { currentLanguage, translations } = useLanguage();
	const t = translations[currentLanguage];

	const story = storiesData.find((s) => s.id === id);

	useEffect(() => {
		setAllWords(getAllWords());
	}, []);

	useEffect(() => {
		if (audioRef.current) {
			const audio = audioRef.current;

			const updateTime = () => setCurrentTime(audio.currentTime);
			const updateDuration = () => setDuration(audio.duration);

			audio.addEventListener('timeupdate', updateTime);
			audio.addEventListener('loadedmetadata', updateDuration);
			audio.addEventListener('ended', () => setIsPlaying(false));

			return () => {
				audio.removeEventListener('timeupdate', updateTime);
				audio.removeEventListener('loadedmetadata', updateDuration);
				audio.removeEventListener('ended', () => setIsPlaying(false));
			};
		}
	}, []);

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleSeek = (e) => {
		const newTime = parseFloat(e.target.value);
		setCurrentTime(newTime);
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
		}
	};

	const changePlaybackRate = (rate) => {
		setPlaybackRate(rate);
		if (audioRef.current) {
			audioRef.current.playbackRate = rate;
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const getCurrentSegment = () => {
		if (!story) return null;
		return story.transcript.find((segment) => currentTime >= segment.start && currentTime <= segment.end);
	};

	const handleWordClick = async (word) => {
		const cleanWord = word.replace(/[.,!?]/g, '').toLowerCase();

		// First try to find in local words
		let foundWord = allWords.find((w) => w.english.toLowerCase() === cleanWord);

		// If not found locally, try to fetch from API or create mock data
		if (!foundWord) {
			try {
				// Try to fetch from a dictionary API (example with Free Dictionary API)
				const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
				const apiData = response.data[0];

				foundWord = {
					id: `api-${cleanWord}`,
					english: apiData.word,
					azerbaijani: `${apiData.word} (tərcümə)`, // You would need a translation API here
					level: ['B1'], // Default level
					synonyms: apiData.meanings[0]?.synonyms || [],
					antonyms: apiData.meanings[0]?.antonyms || [],
					pronunciation: {
						uk: apiData.phonetics.find((p) => p.audio)?.audio || '',
						us: apiData.phonetics.find((p) => p.audio)?.audio || '',
					},
				};
			} catch (error) {
				// If API fails, create mock data
				foundWord = {
					id: `mock-${cleanWord}`,
					english: cleanWord,
					azerbaijani: `${cleanWord} (tərcümə)`,
					level: ['B1'],
					synonyms: ['synonym1', 'synonym2'],
					antonyms: ['antonym1', 'antonym2'],
					pronunciation: {
						uk: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
						us: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
					},
				};
			}
		}

		if (foundWord) {
			setIsPlaying(false);
			if (audioRef.current) {
				audioRef.current.pause();
			}
			setSelectedWord(foundWord);
		}
	};

	const handleSegmentClick = (segmentIndex, segment) => {
		// Jump to the segment time
		if (audioRef.current) {
			audioRef.current.currentTime = segment.start;
			setCurrentTime(segment.start);
		}

		// Select the segment
		if (selectedSegment === segmentIndex) {
			setSelectedSegment(null);
		} else {
			setSelectedSegment(segmentIndex);
		}
	};

	const handleOutsideClick = () => setSelectedSegment(null);

	if (!story) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>Story not found</h2>
					<button
						onClick={() => navigate('/story-listening')}
						className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
					>
						Back to Stories
					</button>
				</div>
			</div>
		);
	}

	const currentSegment = getCurrentSegment();

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50' onClick={handleOutsideClick}>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='flex items-center mb-8'>
					<button
						onClick={() => navigate('/story-listening')}
						className='p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors mr-4'
					>
						<ArrowLeft size={24} />
					</button>
					<div>
						<h1 className='text-3xl md:text-4xl font-bold text-gray-800'>{story.title}</h1>
						<div className='flex items-center mt-2 space-x-4'>
							<span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>{story.level}</span>
							<span className='text-gray-600'>{story.duration} minutes</span>
						</div>
					</div>
				</div>

				{/* Audio Player */}
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
					<audio ref={audioRef} src={story.audioUrl} />

					{/* Controls */}
					<div className='flex items-center justify-between mb-6'>
						<button
							onClick={togglePlayPause}
							className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl'
						>
							{isPlaying ? <Pause size={24} /> : <Play size={24} className='ml-1' />}
						</button>

						<div className='flex items-center space-x-4'>
							<button
								onClick={() => changePlaybackRate(0.75)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									playbackRate === 0.75 ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
								}`}
							>
								{t.slow}
							</button>
							<button
								onClick={() => changePlaybackRate(1)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									playbackRate === 1 ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
								}`}
							>
								{t.normal}
							</button>
							<button
								onClick={() => changePlaybackRate(1.25)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									playbackRate === 1.25 ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
								}`}
							>
								{t.fast}
							</button>
						</div>
					</div>

					{/* Progress Bar */}
					<div className='space-y-2'>
						<input
							type='range'
							min='0'
							max={duration || 0}
							value={currentTime}
							onChange={handleSeek}
							className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
						/>
						<div className='flex justify-between text-sm text-gray-600'>
							<span>{formatTime(currentTime)}</span>
							<span>{formatTime(duration)}</span>
						</div>
					</div>
				</div>

				{/* Transcript */}
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
					{/* Transcript Header */}
					<div className='flex items-center justify-between p-6 border-b border-gray-100'>
						<h2 className='text-xl font-semibold text-gray-800'>Transcript</h2>
						<div className='flex items-center space-x-3'>
							<button
								onClick={() => {
									setShowTranslation(!showTranslation);
								}}
								className='flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors'
							>
								<Languages size={16} />
								<span>{selectedSegment !== null ? (currentLanguage === 'az' ? 'Cümləni tərcümə et' : 'Translate Sentence') : t.translate}</span>
							</button>
							{selectedSegment !== null && (
								<span className='text-sm text-gray-500'>{currentLanguage === 'az' ? 'Cümlə seçildi' : 'Sentence selected'}</span>
							)}
						</div>
					</div>

					{/* Transcript Content */}
					<div className='p-6 max-h-96 overflow-y-auto'>
						<div className='space-y-4'>
							{story.transcript.map((segment, index) => (
								<motion.div
									key={index}
									onClick={(e) => {
										e.stopPropagation();
										handleSegmentClick(index, segment);
									}}
									className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
										currentSegment === segment
											? 'bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 shadow-md'
											: selectedSegment === index
											? 'bg-blue-50 border-l-4 border-blue-500'
											: 'hover:bg-gray-50'
									}`}
								>
									<p className='text-gray-800 leading-relaxed mb-2'>
										{segment.text.split(' ').map((word, wordIndex) => (
											<span
												key={wordIndex}
												onClick={(e) => {
													e.stopPropagation();
													handleWordClick(word.replace(/[.,!?]/g, ''));
												}}
												className='cursor-pointer hover:text-purple-600 hover:bg-purple-50 px-1 py-0.5 rounded transition-colors'
											>
												{word}
											</span>
										))}
									</p>

									<AnimatePresence>
										{showTranslation && segment.translation && (selectedSegment === null || selectedSegment === index) && (
											<motion.p
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												className='text-blue-600 text-sm italic border-t border-blue-100 pt-2 mt-2'
											>
												{segment.translation}
											</motion.p>
										)}
									</AnimatePresence>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Word Detail Modal */}
			<AnimatePresence>{selectedWord && <WordDetailModal word={selectedWord} onClose={() => setSelectedWord(null)} />}</AnimatePresence>
		</div>
	);
};

export default StoryDetail;

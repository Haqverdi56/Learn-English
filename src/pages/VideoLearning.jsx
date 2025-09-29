import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, RotateCcw, CircleCheck as CheckCircle, Circle as XCircle, Crown } from 'lucide-react';
import { videosData, getVideosByLevel, getAllVideoLevels } from '../data/videos';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../store/slices/languageSlice';
import { selectHasPremiumAccess } from '../store/slices/subscriptionSlice';

const VideoLearning = () => {
	const [selectedLevel, setSelectedLevel] = useState('A1');
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [showSubtitles, setShowSubtitles] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [userAnswer, setUserAnswer] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [score, setScore] = useState(0);
	const [completedQuestions, setCompletedQuestions] = useState(new Set());

	const videoRef = useRef(null);
	const currentLanguage = useSelector(selectCurrentLanguage);
	const hasPremiumAccess = useSelector(selectHasPremiumAccess);

	const levels = getAllVideoLevels();
	const filteredVideos = getVideosByLevel(selectedLevel);

	useEffect(() => {
		if (videoRef.current) {
			const video = videoRef.current;

			const updateTime = () => {
				setCurrentTime(video.currentTime);
				
				// Check for questions at current time
				if (selectedVideo) {
					const question = selectedVideo.questions.find(
						q => Math.abs(video.currentTime - q.time) < 0.5 && !completedQuestions.has(q.id)
					);
					
					if (question && !currentQuestion) {
						video.pause();
						setIsPlaying(false);
						setCurrentQuestion(question);
					}
				}
			};

			const updateDuration = () => setDuration(video.duration);

			video.addEventListener('timeupdate', updateTime);
			video.addEventListener('loadedmetadata', updateDuration);
			video.addEventListener('ended', () => setIsPlaying(false));

			return () => {
				video.removeEventListener('timeupdate', updateTime);
				video.removeEventListener('loadedmetadata', updateDuration);
				video.removeEventListener('ended', () => setIsPlaying(false));
			};
		}
	}, [selectedVideo, currentQuestion, completedQuestions]);

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleSeek = (e) => {
		const newTime = parseFloat(e.target.value);
		setCurrentTime(newTime);
		if (videoRef.current) {
			videoRef.current.currentTime = newTime;
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const getCurrentSubtitle = () => {
		if (!selectedVideo) return null;
		return selectedVideo.transcript.find(
			segment => currentTime >= segment.start && currentTime <= segment.end
		);
	};

	const handleAnswer = (answerIndex) => {
		setUserAnswer(answerIndex);
		setShowResult(true);
		
		const isCorrect = answerIndex === currentQuestion.correct;
		if (isCorrect) {
			setScore(score + 1);
		}

		setTimeout(() => {
			setCompletedQuestions(prev => new Set([...prev, currentQuestion.id]));
			setCurrentQuestion(null);
			setUserAnswer(null);
			setShowResult(false);
			
			// Resume video
			if (videoRef.current) {
				videoRef.current.play();
				setIsPlaying(true);
			}
		}, 2000);
	};

	const resetVideo = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			setCurrentTime(0);
		}
		setCurrentQuestion(null);
		setUserAnswer(null);
		setShowResult(false);
		setScore(0);
		setCompletedQuestions(new Set());
	};

	const getLevelColor = (level) => {
		switch (level) {
			case 'A1': return 'bg-green-100 text-green-800 border-green-200';
			case 'A2': return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'B1': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'B2': return 'bg-orange-100 text-orange-800 border-orange-200';
			case 'C1': return 'bg-red-100 text-red-800 border-red-200';
			default: return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const currentSubtitle = getCurrentSubtitle();

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6'>
						{currentLanguage === 'az' ? 'Video ilə Öyrən' : 'Learn with Videos'}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Qısa videolarla dinləmə və anlama qabiliyyətinizi inkişaf etdirin.'
							: 'Improve your listening and comprehension skills with short videos.'}
					</p>
				</div>

				{/* Level Filter */}
				<div className='flex flex-wrap justify-center gap-3 mb-8'>
					{levels.map((level) => (
						<button
							key={level}
							onClick={() => {
								if (['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess) {
									alert(currentLanguage === 'az' ? 'Bu səviyyə üçün Premium abunəlik lazımdır' : 'Premium subscription required for this level');
									return;
								}
								setSelectedLevel(level);
								setSelectedVideo(null);
							}}
							className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border relative ${
								selectedLevel === level
									? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg border-transparent'
									: !['B1', 'B2', 'C1', 'C2'].includes(level) || hasPremiumAccess
									? getLevelColor(level) + ' hover:shadow-md'
									: 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
							}`}
							disabled={['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess}
						>
							{level}
							{['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess && (
								<Crown size={12} className='absolute -top-1 -right-1 text-yellow-500' />
							)}
						</button>
					))}
				</div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Video List */}
					<div className='lg:col-span-1'>
						<h2 className='text-2xl font-bold text-gray-800 mb-6'>
							{currentLanguage === 'az' ? 'Videolar' : 'Videos'} ({selectedLevel})
						</h2>
						<div className='space-y-4'>
							{filteredVideos.map((video, index) => (
								<motion.div
									key={video.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									onClick={() => {
										setSelectedVideo(video);
										resetVideo();
									}}
									className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
										selectedVideo?.id === video.id
											? 'ring-2 ring-red-500 shadow-lg'
											: 'hover:shadow-md'
									}`}
								>
									<div className='relative'>
										<img
											src={video.thumbnail}
											alt={video.title}
											className='w-full h-32 object-cover'
										/>
										<div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
											<Play size={24} className='text-white' />
										</div>
										<div className='absolute top-2 right-2'>
											<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(video.level)}`}>
												{video.level}
											</span>
										</div>
									</div>
									<div className='p-4 bg-white/80 backdrop-blur-sm'>
										<h3 className='font-semibold text-gray-800 mb-2'>{video.title}</h3>
										<p className='text-sm text-gray-600'>{video.duration}s</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Video Player */}
					<div className='lg:col-span-2'>
						{selectedVideo ? (
							<div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
								{/* Video */}
								<div className='relative mb-6'>
									<video
										ref={videoRef}
										src={selectedVideo.videoUrl}
										className='w-full rounded-lg'
										poster={selectedVideo.thumbnail}
									/>
									
									{/* Subtitles */}
									{showSubtitles && currentSubtitle && (
										<div className='absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg'>
											<p className='text-center font-medium'>{currentSubtitle.text}</p>
											<p className='text-center text-sm text-gray-300 mt-1'>{currentSubtitle.translation}</p>
										</div>
									)}
								</div>

								{/* Controls */}
								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<button
											onClick={togglePlayPause}
											className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200'
										>
											{isPlaying ? <Pause size={20} /> : <Play size={20} />}
											<span>{isPlaying ? (currentLanguage === 'az' ? 'Dayandır' : 'Pause') : (currentLanguage === 'az' ? 'Oynat' : 'Play')}</span>
										</button>

										<div className='flex items-center space-x-4'>
											<button
												onClick={() => setShowSubtitles(!showSubtitles)}
												className={`px-3 py-2 rounded-lg font-medium transition-colors ${
													showSubtitles ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
												}`}
											>
												{currentLanguage === 'az' ? 'Altyazı' : 'Subtitles'}
											</button>

											<button
												onClick={resetVideo}
												className='p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
											>
												<RotateCcw size={20} />
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

									{/* Score */}
									<div className='text-center'>
										<span className='text-lg font-medium text-gray-700'>
											{currentLanguage === 'az' ? 'Xal:' : 'Score:'} {score} / {selectedVideo.questions.length}
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className='bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20'>
								<div className='text-6xl mb-4'>🎬</div>
								<h3 className='text-xl font-semibold text-gray-600 mb-2'>
									{currentLanguage === 'az' ? 'Video seçin' : 'Select a Video'}
								</h3>
								<p className='text-gray-500'>
									{currentLanguage === 'az' ? 'İzləmək istədiyiniz videonu seçin' : 'Choose a video you want to watch'}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Question Modal */}
			<AnimatePresence>
				{currentQuestion && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='bg-white rounded-2xl max-w-md w-full shadow-2xl p-6'
						>
							<h3 className='text-xl font-bold text-gray-800 mb-4'>{currentQuestion.question}</h3>
							
							<div className='space-y-3 mb-6'>
								{currentQuestion.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswer(index)}
										disabled={showResult}
										className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
											showResult
												? index === currentQuestion.correct
													? 'bg-green-100 border-green-500 text-green-800'
													: userAnswer === index
													? 'bg-red-100 border-red-500 text-red-800'
													: 'bg-gray-100 border-gray-300 text-gray-500'
												: 'bg-white border-gray-200 hover:bg-gray-50'
										}`}
									>
										<div className='flex items-center space-x-3'>
											<span className='w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold'>
												{String.fromCharCode(65 + index)}
											</span>
											<span>{option}</span>
											{showResult && index === currentQuestion.correct && (
												<CheckCircle size={16} className='text-green-600 ml-auto' />
											)}
											{showResult && userAnswer === index && index !== currentQuestion.correct && (
												<XCircle size={16} className='text-red-600 ml-auto' />
											)}
										</div>
									</button>
								))}
							</div>

							{showResult && (
								<div className={`text-center p-3 rounded-lg ${
									userAnswer === currentQuestion.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
								}`}>
									{userAnswer === currentQuestion.correct 
										? (currentLanguage === 'az' ? '✅ Doğru!' : '✅ Correct!')
										: (currentLanguage === 'az' ? '❌ Səhv!' : '❌ Wrong!')
									}
								</div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default VideoLearning;
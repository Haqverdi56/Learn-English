import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Play, Headphones, Mic } from 'lucide-react';
import { storiesData } from '../data/stories';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { useSelector } from 'react-redux';
import { selectHasPremiumAccess } from '../store/slices/subscriptionSlice';
import { Crown } from 'lucide-react';

const StoryListening = () => {
	const [selectedLevels, setSelectedLevels] = useState([]);
	const [contentType, setContentType] = useState('stories'); // 'stories' or 'podcasts'

	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);
	const hasPremiumAccess = useSelector(selectHasPremiumAccess);

	const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

	// Mock podcast data
	const podcastsData = [
		{
			id: 'podcast-1',
			title: 'English Learning Tips',
			duration: 15,
			level: 'B1',
			image: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=400',
			audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			description: 'Learn effective strategies for improving your English skills.',
		},
		{
			id: 'podcast-2',
			title: 'Daily Conversations',
			duration: 12,
			level: 'A2',
			image: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=400',
			audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			description: 'Practice common English conversations for everyday situations.',
		},
		{
			id: 'podcast-3',
			title: 'Business English',
			duration: 20,
			level: 'B2',
			image: 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=400',
			audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			description: 'Professional English for workplace communication.',
		},
		{
			id: 'podcast-4',
			title: 'Grammar Made Easy',
			duration: 18,
			level: 'B1',
			image: 'https://images.pexels.com/photos/6686442/pexels-photo-6686442.jpeg?auto=compress&cs=tinysrgb&w=400',
			audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			description: 'Simplify complex grammar rules with practical examples.',
		},
		{
			id: 'podcast-5',
			title: 'Pronunciation Practice',
			duration: 10,
			level: 'A2',
			image: 'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=400',
			audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
			description: 'Improve your English pronunciation with guided exercises.',
		},
	];

	const currentData = contentType === 'stories' ? storiesData : podcastsData;
	const filteredContent = selectedLevels.length === 0 ? currentData : currentData.filter((item) => selectedLevels.includes(item.level));

	const getLevelColor = (level) => {
		switch (level) {
			case 'A1':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'A2':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'B1':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'B2':
				return 'bg-orange-100 text-orange-800 border-orange-200';
			case 'C1':
				return 'bg-red-100 text-red-800 border-red-200';
			case 'C2':
				return 'bg-purple-100 text-purple-800 border-purple-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4'>
						{currentLanguage === 'az' ? 'Dinləmə Mərkəzi' : 'Listening Hub'}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Maraqlı hekayələr və podcastlarla dinləmə qabiliyyətinizi inkişaf etdirin.'
							: 'Improve your listening skills with engaging stories and podcasts.'}
					</p>

					{/* Content Type Toggle */}
					<div className='flex items-center justify-center space-x-4 mt-8 mb-8'>
						<button
							onClick={() => setContentType('stories')}
							className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
								contentType === 'stories'
									? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
									: 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
							}`}
						>
							<Headphones size={20} />
							<span>{currentLanguage === 'az' ? 'Hekayələr' : 'Stories'}</span>
						</button>
						<button
							onClick={() => setContentType('podcasts')}
							className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
								contentType === 'podcasts'
									? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
									: 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
							}`}
						>
							<Mic size={20} />
							<span>{currentLanguage === 'az' ? 'Podcastlar' : 'Podcasts'}</span>
						</button>
					</div>
					{/* Level Filter */}
					<div className='flex flex-wrap items-center justify-center gap-2 mt-8'>
						<span className='text-gray-600 font-medium mr-2'>{currentLanguage === 'az' ? 'Səviyyə:' : 'Level:'}</span>
						{allLevels.map((level) => (
							<button
								key={level}
								onClick={() => {
									if (['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess) {
										alert(currentLanguage === 'az' ? 'Bu səviyyə üçün Premium abunəlik lazımdır' : 'Premium subscription required for this level');
										return;
									}
									setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
								}}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 relative ${
									selectedLevels.includes(level)
										? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
										: !['B1', 'B2', 'C1', 'C2'].includes(level) || hasPremiumAccess
										? 'bg-white/60 text-gray-600 hover:bg-white/80 border border-white/20'
										: 'bg-gray-200 text-gray-400 cursor-not-allowed'
								}`}
								disabled={['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess}
							>
								{level}
								{['B1', 'B2', 'C1', 'C2'].includes(level) && !hasPremiumAccess && (
									<Crown size={12} className='absolute -top-1 -right-1 text-yellow-500' />
								)}
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

				{/* Content Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
					{filteredContent.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className='group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20'
						>
							{/* Image */}
							<div className='relative overflow-hidden'>
								<img
									src={item.image}
									alt={item.title}
									className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='absolute top-3 left-3'>
									<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(item.level)}`}>{item.level}</span>
								</div>
								<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
										<div className='w-12 h-12 bg-white/90 rounded-full flex items-center justify-center'>
											<Play size={20} className='text-purple-600 ml-0.5' />
										</div>
									</div>
								</div>
							</div>

							{/* Content */}
							<div className='p-6'>
								<h3 className='text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors'>{item.title}</h3>

								{contentType === 'podcasts' && item.description && (
									<p className='text-sm text-gray-600 mb-3 line-clamp-2'>{item.description}</p>
								)}

								<div className='flex items-center text-gray-500 text-sm mb-4'>
									<Clock size={14} className='mr-1' />
									<span>
										{item.duration} {t.minutes}
									</span>
								</div>

								{contentType === 'stories' ? (
									<Link
										to={`/story/${item.id}`}
										className='block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg'
									>
										{t.watch}
									</Link>
								) : (
									<button
										onClick={() => {
											// Podcast oynatma funksiyası
											const audio = new Audio(item.audioUrl);
											audio.play().catch(error => console.log('Audio play failed:', error));
										}}
										className='block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg'
									>
										{currentLanguage === 'az' ? 'Dinlə' : 'Listen'}
									</button>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StoryListening;

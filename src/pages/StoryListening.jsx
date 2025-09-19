import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Play } from 'lucide-react';
import { storiesData } from '../data/stories';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { useSelector } from 'react-redux';

const StoryListening = () => {
	const [selectedLevels, setSelectedLevels] = useState([]);

	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);

	const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

	const filteredStories = selectedLevels.length === 0 ? storiesData : storiesData.filter((story) => selectedLevels.includes(story.level));

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
						{t.storyListening}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Maraqlı hekayələrlə dinləmə qabiliyyətinizi inkişaf etdirin və lüğət ehtiyatınızı artırın.'
							: 'Improve your listening skills and expand your vocabulary with engaging stories.'}
					</p>

					{/* Level Filter */}
					<div className='flex flex-wrap items-center justify-center gap-2 mt-8'>
						<span className='text-gray-600 font-medium mr-2'>{currentLanguage === 'az' ? 'Səviyyə:' : 'Level:'}</span>
						{allLevels.map((level) => (
							<button
								key={level}
								onClick={() => {
									setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
								}}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
									selectedLevels.includes(level)
										? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
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

				{/* Stories Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
					{filteredStories.map((story, index) => (
						<motion.div
							key={story.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className='group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20'
						>
							{/* Image */}
							<div className='relative overflow-hidden'>
								<img
									src={story.image}
									alt={story.title}
									className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='absolute top-3 left-3'>
									<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(story.level)}`}>{story.level}</span>
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
								<h3 className='text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors'>{story.title}</h3>

								<div className='flex items-center text-gray-500 text-sm mb-4'>
									<Clock size={14} className='mr-1' />
									<span>
										{story.duration} {t.minutes}
									</span>
								</div>

								<Link
									to={`/story/${story.id}`}
									className='block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg'
								>
									{t.watch}
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StoryListening;

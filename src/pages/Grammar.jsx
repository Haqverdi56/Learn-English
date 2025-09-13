import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { grammarData, getGrammarByLevel, getAllGrammarLevels, getAllGrammarCategories } from '../data/grammar';

const Grammar = () => {
	const [selectedLevel, setSelectedLevel] = useState('A1');
	const [selectedTopic, setSelectedTopic] = useState(null);
	const { currentLanguage } = useLanguage();

	const levels = getAllGrammarLevels();
	const categories = getAllGrammarCategories();
	const filteredGrammar = getGrammarByLevel(selectedLevel);

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
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	const getCategoryColor = (category) => {
		switch (category) {
			case 'Tenses':
				return 'bg-blue-50 text-blue-700 border-blue-200';
			case 'Grammar Rules':
				return 'bg-green-50 text-green-700 border-green-200';
			case 'Modal Verbs':
				return 'bg-purple-50 text-purple-700 border-purple-200';
			case 'Conditionals':
				return 'bg-orange-50 text-orange-700 border-orange-200';
			case 'Voice':
				return 'bg-pink-50 text-pink-700 border-pink-200';
			default:
				return 'bg-gray-50 text-gray-700 border-gray-200';
		}
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6'>
						{currentLanguage === 'az' ? 'Qrammatika' : 'Grammar'}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'İngilis dilinin qrammatika qaydalarını səviyyələrə görə öyrənin və praktika edin.'
							: 'Learn and practice English grammar rules organized by levels.'}
					</p>
				</div>

				{/* Level Filter */}
				<div className='flex flex-wrap justify-center gap-3 mb-8'>
					{levels.map((level) => (
						<button
							key={level}
							onClick={() => {
								setSelectedLevel(level);
								setSelectedTopic(null);
							}}
							className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border ${
								selectedLevel === level
									? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg border-transparent'
									: getLevelColor(level) + ' hover:shadow-md'
							}`}
						>
							{level}
						</button>
					))}
				</div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Topics List */}
					<div className='lg:col-span-1'>
						<h2 className='text-2xl font-bold text-gray-800 mb-6'>
							{currentLanguage === 'az' ? 'Mövzular' : 'Topics'} ({selectedLevel})
						</h2>
						<div className='space-y-3'>
							{filteredGrammar.map((topic, index) => (
								<motion.div
									key={topic.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									onClick={() => setSelectedTopic(topic)}
									className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
										selectedTopic?.id === topic.id
											? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md'
											: 'bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg hover:bg-white/90'
									}`}
								>
									<div className='flex items-center justify-between'>
										<div className='flex-1'>
											<h3 className='font-semibold text-gray-800 mb-2'>{topic.title}</h3>
											<p className='text-sm text-gray-600 mb-3'>{topic.description}</p>
											<div className='flex items-center space-x-2'>
												<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(topic.level)}`}>{topic.level}</span>
												<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(topic.category)}`}>
													{topic.category}
												</span>
											</div>
										</div>
										<ChevronRight size={20} className='text-gray-400' />
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Content Area */}
					<div className='lg:col-span-2'>
						{selectedTopic ? (
							<motion.div
								key={selectedTopic.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20'
							>
								<div className='flex items-center justify-between mb-6'>
									<h2 className='text-3xl font-bold text-gray-800'>{selectedTopic.title}</h2>
									<div className='flex items-center space-x-2'>
										<span className={`px-3 py-1 text-sm font-medium rounded-full border ${getLevelColor(selectedTopic.level)}`}>
											{selectedTopic.level}
										</span>
										<span className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(selectedTopic.category)}`}>
											{selectedTopic.category}
										</span>
									</div>
								</div>

								{/* Explanation */}
								<div className='mb-8'>
									<h3 className='text-xl font-semibold text-gray-800 mb-4'>{currentLanguage === 'az' ? 'İzahat' : 'Explanation'}</h3>
									<p className='text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg'>{selectedTopic.content.explanation}</p>
								</div>

								{/* Rules */}
								<div className='mb-8'>
									<h3 className='text-xl font-semibold text-gray-800 mb-4'>{currentLanguage === 'az' ? 'Qaydalar' : 'Rules'}</h3>
									<ul className='space-y-3'>
										{selectedTopic.content.rules.map((rule, index) => (
											<li key={index} className='flex items-start space-x-3 bg-green-50 p-3 rounded-lg'>
												<span className='flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>
													{index + 1}
												</span>
												<span className='text-gray-700'>{rule}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Examples */}
								<div>
									<h3 className='text-xl font-semibold text-gray-800 mb-4'>{currentLanguage === 'az' ? 'Nümunələr' : 'Examples'}</h3>
									<div className='space-y-4'>
										{selectedTopic.content.examples.map((example, index) => (
											<div key={index} className='bg-purple-50 p-4 rounded-lg border border-purple-200'>
												<div className='flex items-center justify-between mb-2'>
													<p className='text-gray-800 font-medium'>{example.english}</p>
													<button className='p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors'>
														<Play size={16} />
													</button>
												</div>
												<p className='text-purple-700 text-sm italic'>{example.azerbaijani}</p>
											</div>
										))}
									</div>
								</div>
							</motion.div>
						) : (
							<div className='bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20'>
								<BookOpen size={64} className='mx-auto text-gray-400 mb-4' />
								<h3 className='text-xl font-semibold text-gray-600 mb-2'>{currentLanguage === 'az' ? 'Mövzu seçin' : 'Select a Topic'}</h3>
								<p className='text-gray-500'>
									{currentLanguage === 'az' ? 'Öyrənmək istədiyiniz qrammatika mövzusunu seçin' : 'Choose a grammar topic you want to learn'}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Grammar;

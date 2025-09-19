import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, BookOpen, PenTool, Mic, Play, Check, X } from 'lucide-react';
import { getSkillsByType, getSkillsByLevel, getAllSkillLevels } from '../data/skills';
import { selectCurrentLanguage } from '../store/slices/languageSlice';
import { useSelector } from 'react-redux';

const Skills = () => {
	const [selectedSkill, setSelectedSkill] = useState('listening');
	const [selectedLevel, setSelectedLevel] = useState('A1');
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [currentTask, setCurrentTask] = useState(0);
	const [userAnswers, setUserAnswers] = useState({});
	const [showResults, setShowResults] = useState(false);

	const levels = getAllSkillLevels();
	const currentLanguage = useSelector(selectCurrentLanguage);

	const skills = [
		{ id: 'listening', label: currentLanguage === 'az' ? 'Dinləmə' : 'Listening', icon: Headphones, color: 'from-blue-500 to-cyan-500' },
		{ id: 'reading', label: currentLanguage === 'az' ? 'Oxuma' : 'Reading', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
		{ id: 'writing', label: currentLanguage === 'az' ? 'Yazma' : 'Writing', icon: PenTool, color: 'from-purple-500 to-pink-500' },
		{ id: 'speaking', label: currentLanguage === 'az' ? 'Danışma' : 'Speaking', icon: Mic, color: 'from-orange-500 to-red-500' },
	];

	const topics = getSkillsByLevel(selectedSkill, selectedLevel);

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

	const handleAnswerSelect = (taskId, answerIndex) => {
		setUserAnswers((prev) => ({
			...prev,
			[taskId]: answerIndex,
		}));
	};

	const handleSubmitTask = () => {
		setShowResults(true);
	};

	const resetTask = () => {
		setUserAnswers({});
		setShowResults(false);
		setCurrentTask(0);
	};

	const renderTask = (task) => {
		const userAnswer = userAnswers[task.id];
		const isCorrect = userAnswer === task.correct;

		switch (task.type) {
			case 'audio':
				return (
					<div className='space-y-6'>
						<div className='bg-blue-50 p-4 rounded-lg'>
							<div className='flex items-center space-x-3 mb-3'>
								<button className='p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors'>
									<Play size={20} />
								</button>
								<span className='text-blue-700 font-medium'>{currentLanguage === 'az' ? 'Səsi dinləyin' : 'Listen to the audio'}</span>
							</div>
							<audio controls className='w-full'>
								<source src={task.audioUrl} type='audio/mpeg' />
							</audio>
						</div>

						<div>
							<h4 className='text-lg font-semibold text-gray-800 mb-4'>{task.question}</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								{task.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswerSelect(task.id, index)}
										disabled={showResults}
										className={`p-3 text-left rounded-lg border transition-all duration-200 ${
											showResults
												? index === task.correct
													? 'bg-green-100 border-green-500 text-green-800'
													: userAnswer === index && index !== task.correct
													? 'bg-red-100 border-red-500 text-red-800'
													: 'bg-gray-50 border-gray-200 text-gray-600'
												: userAnswer === index
												? 'bg-blue-100 border-blue-500 text-blue-800'
												: 'bg-white border-gray-200 hover:bg-gray-50'
										}`}
									>
										<div className='flex items-center space-x-3'>
											<span className='w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold'>
												{String.fromCharCode(65 + index)}
											</span>
											<span>{option}</span>
											{showResults && index === task.correct && <Check size={16} className='text-green-600 ml-auto' />}
											{showResults && userAnswer === index && index !== task.correct && <X size={16} className='text-red-600 ml-auto' />}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				);

			case 'text':
				return (
					<div className='space-y-6'>
						<div className='bg-gray-50 p-4 rounded-lg'>
							<p className='text-gray-800 leading-relaxed'>{task.text}</p>
						</div>

						<div>
							<h4 className='text-lg font-semibold text-gray-800 mb-4'>{task.question}</h4>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								{task.options.map((option, index) => (
									<button
										key={index}
										onClick={() => handleAnswerSelect(task.id, index)}
										disabled={showResults}
										className={`p-3 text-left rounded-lg border transition-all duration-200 ${
											showResults
												? index === task.correct
													? 'bg-green-100 border-green-500 text-green-800'
													: userAnswer === index && index !== task.correct
													? 'bg-red-100 border-red-500 text-red-800'
													: 'bg-gray-50 border-gray-200 text-gray-600'
												: userAnswer === index
												? 'bg-blue-100 border-blue-500 text-blue-800'
												: 'bg-white border-gray-200 hover:bg-gray-50'
										}`}
									>
										<div className='flex items-center space-x-3'>
											<span className='w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold'>
												{String.fromCharCode(65 + index)}
											</span>
											<span>{option}</span>
											{showResults && index === task.correct && <Check size={16} className='text-green-600 ml-auto' />}
											{showResults && userAnswer === index && index !== task.correct && <X size={16} className='text-red-600 ml-auto' />}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				);

			case 'writing':
				return (
					<div className='space-y-6'>
						<div>
							<h4 className='text-lg font-semibold text-gray-800 mb-4'>{task.question}</h4>
							<textarea
								placeholder={task.placeholder}
								className='w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
								disabled={showResults}
							/>
							<p className='text-sm text-gray-500 mt-2'>
								{currentLanguage === 'az' ? 'Minimum' : 'Minimum'} {task.minWords} {currentLanguage === 'az' ? 'söz' : 'words'}
							</p>
						</div>
					</div>
				);

			case 'speaking':
				return (
					<div className='space-y-6'>
						<div>
							<h4 className='text-lg font-semibold text-gray-800 mb-4'>{task.question}</h4>
							{task.imageUrl && <img src={task.imageUrl} alt='Speaking task' className='w-full max-w-md mx-auto rounded-lg mb-4' />}
							<div className='bg-blue-50 p-4 rounded-lg mb-4'>
								<h5 className='font-medium text-blue-800 mb-2'>{currentLanguage === 'az' ? 'Cavablandırın:' : 'Answer these questions:'}</h5>
								<ul className='space-y-1'>
									{task.prompts.map((prompt, index) => (
										<li key={index} className='text-blue-700'>
											• {prompt}
										</li>
									))}
								</ul>
							</div>
							<div className='text-center'>
								<button className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 mx-auto'>
									<Mic size={20} />
									<span>{currentLanguage === 'az' ? 'Qeydə al' : 'Start Recording'}</span>
								</button>
							</div>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6'>
						{currentLanguage === 'az' ? 'Bacarıqlar' : 'Skills'}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'İngilis dilində 4 əsas bacarığınızı inkişaf etdirin: dinləmə, oxuma, yazma və danışma.'
							: 'Develop your 4 core English skills: listening, reading, writing, and speaking.'}
					</p>
				</div>

				{/* Skills Navigation */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
					{skills.map((skill) => (
						<button
							key={skill.id}
							onClick={() => {
								setSelectedSkill(skill.id);
								setSelectedTopic(null);
								resetTask();
							}}
							className={`p-6 rounded-xl transition-all duration-300 ${
								selectedSkill === skill.id
									? `bg-gradient-to-r ${skill.color} text-white shadow-lg transform scale-105`
									: 'bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-lg hover:scale-102'
							}`}
						>
							<skill.icon size={32} className='mx-auto mb-3' />
							<h3 className='font-semibold'>{skill.label}</h3>
						</button>
					))}
				</div>

				{/* Level Filter */}
				<div className='flex flex-wrap justify-center gap-3 mb-8'>
					{levels.map((level) => (
						<button
							key={level}
							onClick={() => {
								setSelectedLevel(level);
								setSelectedTopic(null);
								resetTask();
							}}
							className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border ${
								selectedLevel === level
									? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border-transparent'
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
							{topics.map((topic, index) => (
								<motion.div
									key={topic.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									onClick={() => {
										setSelectedTopic(topic);
										resetTask();
									}}
									className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
										selectedTopic?.id === topic.id
											? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-md'
											: 'bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg hover:bg-white/90'
									}`}
								>
									<h3 className='font-semibold text-gray-800 mb-2'>{topic.title}</h3>
									<p className='text-sm text-gray-600 mb-3'>{topic.description}</p>
									<div className='flex items-center justify-between'>
										<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(topic.level)}`}>{topic.level}</span>
										<span className='text-xs text-gray-500'>
											{topic.tasks.length} {currentLanguage === 'az' ? 'tapşırıq' : 'tasks'}
										</span>
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
									<div>
										<h2 className='text-3xl font-bold text-gray-800'>{selectedTopic.title}</h2>
										<p className='text-gray-600 mt-2'>{selectedTopic.description}</p>
									</div>
									<span className={`px-3 py-1 text-sm font-medium rounded-full border ${getLevelColor(selectedTopic.level)}`}>
										{selectedTopic.level}
									</span>
								</div>

								{/* Task Progress */}
								<div className='mb-6'>
									<div className='flex items-center justify-between mb-2'>
										<span className='text-sm font-medium text-gray-600'>
											{currentLanguage === 'az' ? 'Tapşırıq' : 'Task'} {currentTask + 1} / {selectedTopic.tasks.length}
										</span>
										<span className='text-sm text-gray-500'>{Math.round(((currentTask + 1) / selectedTopic.tasks.length) * 100)}%</span>
									</div>
									<div className='w-full bg-gray-200 rounded-full h-2'>
										<div
											className='bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300'
											style={{ width: `${((currentTask + 1) / selectedTopic.tasks.length) * 100}%` }}
										></div>
									</div>
								</div>

								{/* Current Task */}
								{selectedTopic.tasks[currentTask] && <div className='mb-6'>{renderTask(selectedTopic.tasks[currentTask])}</div>}

								{/* Task Controls */}
								<div className='flex items-center justify-between'>
									<button
										onClick={() => setCurrentTask(Math.max(0, currentTask - 1))}
										disabled={currentTask === 0}
										className='px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										{currentLanguage === 'az' ? 'Əvvəlki' : 'Previous'}
									</button>

									<div className='flex space-x-3'>
										{!showResults ? (
											<button
												onClick={handleSubmitTask}
												className='px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200'
											>
												{currentLanguage === 'az' ? 'Cavabı yoxla' : 'Check Answer'}
											</button>
										) : (
											<button
												onClick={() => {
													if (currentTask < selectedTopic.tasks.length - 1) {
														setCurrentTask(currentTask + 1);
														setShowResults(false);
														setUserAnswers({});
													}
												}}
												disabled={currentTask >= selectedTopic.tasks.length - 1}
												className='px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
											>
												{currentTask >= selectedTopic.tasks.length - 1
													? currentLanguage === 'az'
														? 'Tamamlandı'
														: 'Completed'
													: currentLanguage === 'az'
													? 'Növbəti'
													: 'Next'}
											</button>
										)}
									</div>

									<button
										onClick={() => setCurrentTask(Math.min(selectedTopic.tasks.length - 1, currentTask + 1))}
										disabled={currentTask >= selectedTopic.tasks.length - 1}
										className='px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
									>
										{currentLanguage === 'az' ? 'Növbəti' : 'Next'}
									</button>
								</div>
							</motion.div>
						) : (
							<div className='bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20'>
								<div className='text-6xl mb-4'>
									{skills.find((s) => s.id === selectedSkill)?.icon &&
										React.createElement(skills.find((s) => s.id === selectedSkill).icon, { size: 64, className: 'mx-auto text-gray-400' })}
								</div>
								<h3 className='text-xl font-semibold text-gray-600 mb-2'>{currentLanguage === 'az' ? 'Mövzu seçin' : 'Select a Topic'}</h3>
								<p className='text-gray-500'>
									{currentLanguage === 'az' ? 'Praktika etmək istədiyiniz mövzunu seçin' : 'Choose a topic you want to practice'}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skills;

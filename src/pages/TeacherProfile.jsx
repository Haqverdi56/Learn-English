import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Users, Clock, Award, MapPin, Calendar, DollarSign } from 'lucide-react';
import { teachersData } from '../data/teachers';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('lessons');

	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);

	const teacher = teachersData.find((t) => t.id === id);

	if (!teacher) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>Teacher not found</h2>
					<button onClick={() => navigate('/teachers')} className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
						Back to Teachers
					</button>
				</div>
			</div>
		);
	}

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star key={index} size={16} className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
		));
	};

	const tabs = [
		{ id: 'lessons', label: currentLanguage === 'az' ? 'Dərslər' : 'Lessons' },
		{ id: 'groups', label: currentLanguage === 'az' ? 'Qruplar' : 'Groups' },
		{ id: 'reviews', label: currentLanguage === 'az' ? 'Rəylər' : 'Reviews' },
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='flex items-center mb-8'>
					<button
						onClick={() => navigate('/teachers')}
						className='p-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors mr-4'
					>
						<ArrowLeft size={24} />
					</button>
					<h1 className='text-3xl font-bold text-gray-800'>{currentLanguage === 'az' ? 'Müəllim Profili' : 'Teacher Profile'}</h1>
				</div>

				{/* Teacher Info Card */}
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden mb-8'>
					<div className='md:flex'>
						{/* Avatar */}
						<div className='md:w-1/3'>
							<img src={teacher.avatar} alt={teacher.name} className='w-full h-64 md:h-full object-cover' />
						</div>

						{/* Info */}
						<div className='md:w-2/3 p-8'>
							<div className='flex items-start justify-between mb-4'>
								<div>
									<h2 className='text-3xl font-bold text-gray-800 mb-2'>{teacher.name}</h2>
									<p className='text-xl text-indigo-600 font-medium mb-2'>{teacher.specialization}</p>
									<div className='flex items-center space-x-2 mb-4'>
										<div className='flex space-x-1'>{renderStars(teacher.rating)}</div>
										<span className='text-lg font-medium'>{teacher.rating}</span>
										<span className='text-gray-600'>
											({teacher.reviews.length} {currentLanguage === 'az' ? 'rəy' : 'reviews'})
										</span>
									</div>
								</div>
							</div>

							{/* Stats */}
							<div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
								<div className='flex items-center space-x-2 text-gray-600'>
									<Clock size={18} />
									<span>
										{teacher.experience} {currentLanguage === 'az' ? 'il təcrübə' : 'years exp.'}
									</span>
								</div>
								<div className='flex items-center space-x-2 text-gray-600'>
									<Users size={18} />
									<span>
										{teacher.totalStudents} {currentLanguage === 'az' ? 'tələbə' : 'students'}
									</span>
								</div>
								<div className='flex items-center space-x-2 text-gray-600'>
									<Award size={18} />
									<span>
										{teacher.certifications.length} {currentLanguage === 'az' ? 'sertifikat' : 'certificates'}
									</span>
								</div>
							</div>

							{/* Languages */}
							<div className='mb-6'>
								<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Dillər:' : 'Languages:'}</h3>
								<div className='flex flex-wrap gap-2'>
									{teacher.languages.map((language, idx) => (
										<span key={idx} className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'>
											{language}
										</span>
									))}
								</div>
							</div>

							{/* Bio */}
							<div className='mb-6'>
								<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Haqqında:' : 'About:'}</h3>
								<p className='text-gray-600 leading-relaxed'>{teacher.bio}</p>
							</div>

							{/* Education & Certifications */}
							<div className='grid md:grid-cols-2 gap-6'>
								<div>
									<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Təhsil:' : 'Education:'}</h3>
									<p className='text-gray-600'>{teacher.education}</p>
								</div>
								<div>
									<h3 className='text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Sertifikatlar:' : 'Certifications:'}</h3>
									<div className='flex flex-wrap gap-1'>
										{teacher.certifications.map((cert, idx) => (
											<span key={idx} className='px-2 py-1 bg-green-100 text-green-700 rounded text-sm'>
												{cert}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
					{/* Tab Headers */}
					<div className='flex border-b border-gray-200'>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
									activeTab === tab.id
										? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
										: 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<div className='p-6'>
						{activeTab === 'lessons' && (
							<div className='space-y-4'>
								{teacher.lessons.map((lesson) => (
									<motion.div
										key={lesson.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-md transition-all duration-300'
									>
										<div className='flex items-start justify-between'>
											<div className='flex-1'>
												<h3 className='text-xl font-semibold text-gray-800 mb-2'>{lesson.title}</h3>
												<div className='flex items-center space-x-4 text-gray-600 mb-3'>
													<div className='flex items-center space-x-1'>
														<Clock size={16} />
														<span>
															{lesson.duration} {currentLanguage === 'az' ? 'dəq' : 'min'}
														</span>
													</div>
													<div className='flex items-center space-x-1'>
														<Award size={16} />
														<span>{lesson.level}</span>
													</div>
													<div className='flex items-center space-x-1'>
														<DollarSign size={16} />
														<span>${lesson.price}</span>
													</div>
												</div>
											</div>
											<button className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200'>
												{currentLanguage === 'az' ? 'Rezerv et' : 'Book Now'}
											</button>
										</div>
									</motion.div>
								))}
							</div>
						)}

						{activeTab === 'groups' && (
							<div className='space-y-4'>
								{teacher.groups && teacher.groups.length > 0 ? (
									teacher.groups.map((group) => (
										<motion.div
											key={group.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-md transition-all duration-300'
										>
											<div className='flex items-start justify-between mb-4'>
												<div className='flex-1'>
													<h3 className='text-xl font-semibold text-gray-800 mb-2'>{group.name}</h3>
													<p className='text-gray-600 mb-3'>{group.description}</p>

													<div className='grid md:grid-cols-2 gap-4 mb-4'>
														<div className='space-y-2'>
															<div className='flex items-center space-x-2 text-gray-600 text-sm'>
																<Award size={16} />
																<span>
																	{currentLanguage === 'az' ? 'Səviyyə:' : 'Level:'} {group.level}
																</span>
															</div>
															<div className='flex items-center space-x-2 text-gray-600 text-sm'>
																<Users size={16} />
																<span>
																	{group.currentMembers}/{group.maxMembers} {currentLanguage === 'az' ? 'üzv' : 'members'}
																</span>
															</div>
															<div className='flex items-center space-x-2 text-gray-600 text-sm'>
																<DollarSign size={16} />
																<span>
																	${group.price} {currentLanguage === 'az' ? 'dərs başına' : 'per lesson'}
																</span>
															</div>
														</div>

														<div className='space-y-2'>
															<div className='flex items-center space-x-2 text-gray-600 text-sm'>
																<Calendar size={16} />
																<span>{group.schedule.days.join(', ')}</span>
															</div>
															<div className='flex items-center space-x-2 text-gray-600 text-sm'>
																<Clock size={16} />
																<span>
																	{group.schedule.time} ({group.schedule.timezone})
																</span>
															</div>
														</div>
													</div>

													{/* Members Progress Bar */}
													<div className='mb-4'>
														<div className='flex items-center justify-between mb-2'>
															<span className='text-sm font-medium text-gray-600'>
																{currentLanguage === 'az' ? 'Qrup dolulluğu' : 'Group Capacity'}
															</span>
															<span className='text-sm text-gray-500'>{Math.round((group.currentMembers / group.maxMembers) * 100)}%</span>
														</div>
														<div className='w-full bg-gray-200 rounded-full h-2'>
															<div
																className='bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300'
																style={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
															></div>
														</div>
													</div>
												</div>
											</div>

											<div className='flex items-center justify-between'>
												<div className='flex items-center space-x-2'>
													{group.currentMembers < group.maxMembers ? (
														<span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium'>
															{currentLanguage === 'az' ? 'Boş yer var' : 'Available'}
														</span>
													) : (
														<span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium'>
															{currentLanguage === 'az' ? 'Dolu' : 'Full'}
														</span>
													)}
												</div>

												<button
													disabled={group.currentMembers >= group.maxMembers}
													className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
												>
													{group.currentMembers >= group.maxMembers
														? currentLanguage === 'az'
															? 'Dolu'
															: 'Full'
														: currentLanguage === 'az'
														? 'Qrupa qoşul'
														: 'Join Group'}
												</button>
											</div>
										</motion.div>
									))
								) : (
									<div className='text-center py-8'>
										<Users size={48} className='mx-auto text-gray-400 mb-4' />
										<p className='text-gray-600'>{currentLanguage === 'az' ? 'Hələ ki qrup yoxdur' : 'No groups available yet'}</p>
									</div>
								)}
							</div>
						)}

						{activeTab === 'reviews' && (
							<div className='space-y-6'>
								{teacher.reviews.map((review) => (
									<motion.div
										key={review.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
									>
										<div className='flex items-start justify-between mb-4'>
											<div>
												<h4 className='font-semibold text-gray-800'>{review.studentName}</h4>
												<div className='flex items-center space-x-2 mt-1'>
													<div className='flex space-x-1'>{renderStars(review.rating)}</div>
													<span className='text-sm text-gray-600'>{review.date}</span>
												</div>
											</div>
										</div>
										<p className='text-gray-600 leading-relaxed'>{review.comment}</p>
									</motion.div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherProfile;

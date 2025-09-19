import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock, Award } from 'lucide-react';
import { teachersData } from '../data/teachers';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';

const Teachers = () => {
	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star key={index} size={16} className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
		));
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6'>
						{t.teachers}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'Təcrübəli müəllimlərimizlə İngilis dilini öyrənin və bacarıqlarınızı inkişaf etdirin.'
							: 'Learn English with our experienced teachers and develop your skills.'}
					</p>
				</div>

				{/* Teachers Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{teachersData.map((teacher, index) => (
						<motion.div
							key={teacher.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group'
						>
							{/* Teacher Avatar */}
							<div className='relative'>
								<img
									src={teacher.avatar}
									alt={teacher.name}
									className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1'>
									<div className='flex items-center space-x-1'>
										<Star size={14} className='text-yellow-400 fill-current' />
										<span className='text-sm font-medium'>{teacher.rating}</span>
									</div>
								</div>
							</div>

							{/* Teacher Info */}
							<div className='p-6'>
								<h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors'>{teacher.name}</h3>
								<p className='text-indigo-600 font-medium mb-3'>{teacher.specialization}</p>

								{/* Stats */}
								<div className='space-y-2 mb-4'>
									<div className='flex items-center text-gray-600 text-sm'>
										<Clock size={14} className='mr-2' />
										<span>
											{teacher.experience} {currentLanguage === 'az' ? 'il təcrübə' : 'years experience'}
										</span>
									</div>
									<div className='flex items-center text-gray-600 text-sm'>
										<Users size={14} className='mr-2' />
										<span>
											{teacher.totalStudents} {currentLanguage === 'az' ? 'tələbə' : 'students'}
										</span>
									</div>
									<div className='flex items-center text-gray-600 text-sm'>
										<Award size={14} className='mr-2' />
										<span>{teacher.certifications.join(', ')}</span>
									</div>
								</div>

								{/* Rating */}
								<div className='flex items-center space-x-2 mb-4'>
									<div className='flex space-x-1'>{renderStars(teacher.rating)}</div>
									<span className='text-sm text-gray-600'>
										({teacher.reviews.length} {currentLanguage === 'az' ? 'rəy' : 'reviews'})
									</span>
								</div>

								{/* Languages */}
								<div className='flex flex-wrap gap-1 mb-4'>
									{teacher.languages.map((language, idx) => (
										<span key={idx} className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'>
											{language}
										</span>
									))}
								</div>

								{/* Bio */}
								<p className='text-gray-600 text-sm mb-4 line-clamp-3'>{teacher.bio}</p>

								{/* View Profile Button */}
								<Link
									to={`/teacher/${teacher.id}`}
									className='block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg'
								>
									{currentLanguage === 'az' ? 'Profili Gör' : 'View Profile'}
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Teachers;

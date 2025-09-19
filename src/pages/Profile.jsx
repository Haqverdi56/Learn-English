import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Award, BookOpen, Headphones, Target, Clock, Calendar, TrendingUp, Star } from 'lucide-react';

const Profile = () => {
	const theme = useSelector((state) => state.theme.mode);
	const user = useSelector((state) => state.auth.user);
	const progress = useSelector((state) => state.progress.stats);
	const achievements = useSelector((state) => state.progress.achievements);
	const subscription = useSelector((state) => state.subscription.subscription);

	if (!user) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
						Profil səhifəsinə daxil olmaq üçün giriş edin
					</h2>
				</div>
			</div>
		);
	}

	const skillsData = [
		{ name: 'Dinləmə', value: progress.skillsProgress.listening, icon: Headphones, color: 'from-blue-500 to-cyan-500' },
		{ name: 'Oxuma', value: progress.skillsProgress.reading, icon: BookOpen, color: 'from-green-500 to-emerald-500' },
		{ name: 'Yazma', value: progress.skillsProgress.writing, icon: Target, color: 'from-purple-500 to-pink-500' },
		{ name: 'Danışma', value: progress.skillsProgress.speaking, icon: Target, color: 'from-orange-500 to-red-500' },
	];

	const stats = [
		{ label: 'Öyrənilən Sözlər', value: progress.wordsLearned, icon: BookOpen, color: 'text-blue-600' },
		{ label: 'Tamamlanan Hekayələr', value: progress.storiesCompleted, icon: Headphones, color: 'text-purple-600' },
		{ label: 'Qrammatika Mövzuları', value: progress.grammarTopicsCompleted, icon: Award, color: 'text-green-600' },
		{
			label: 'Öyrənmə Müddəti',
			value: `${Math.floor(progress.totalStudyTime / 60)}s ${progress.totalStudyTime % 60}d`,
			icon: Clock,
			color: 'text-orange-600',
		},
		{ label: 'Ardıcıl Günlər', value: progress.streak, icon: Calendar, color: 'text-red-600' },
		{ label: 'Cari Səviyyə', value: progress.currentLevel, icon: TrendingUp, color: 'text-indigo-600' },
	];

	const mockAchievements = [
		{ id: 1, title: 'İlk Addım', description: 'İlk sözünüzü öyrəndiniz', icon: '🎯', unlockedAt: '2024-01-15' },
		{ id: 2, title: 'Söz Ustası', description: '100 söz öyrəndiniz', icon: '📚', unlockedAt: '2024-01-20' },
		{ id: 3, title: 'Hekayə Sevər', description: 'İlk hekayənizi dinlədiniz', icon: '🎧', unlockedAt: '2024-01-18' },
		{ id: 4, title: 'Ardıcıl 7 Gün', description: '7 gün ardıcıl öyrəndiniz', icon: '🔥', unlockedAt: '2024-01-25' },
	];

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>Profil</h1>
				</div>

				{/* User Info */}
				<div
					className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg border mb-8 ${
						theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
					}`}
				>
					<div className='flex items-center space-x-6'>
						<div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
							<User size={40} className='text-white' />
						</div>
						<div>
							<h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{user.name}</h2>
							<p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</p>
							<div className='flex items-center space-x-2 mt-2'>
								<span
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										subscription.isPremium ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
									}`}
								>
									{subscription.isPremium ? 'Premium' : 'Pulsuz'}
								</span>
								<span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>{progress.currentLevel}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8'>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className={`backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border ${
								theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
							}`}
						>
							<stat.icon size={24} className={`mx-auto mb-3 ${stat.color}`} />
							<div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{stat.value}</div>
							<div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
						</motion.div>
					))}
				</div>

				{/* Skills Progress */}
				<div
					className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg border mb-8 ${
						theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
					}`}
				>
					<h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Bacarıqlar İrəliləyişi</h3>
					<div className='grid md:grid-cols-2 gap-6'>
						{skillsData.map((skill, index) => (
							<div key={index} className='space-y-3'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<skill.icon size={20} className='text-gray-600' />
										<span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{skill.name}</span>
									</div>
									<span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{skill.value}%</span>
								</div>
								<div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
									<div
										className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
										style={{ width: `${skill.value}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Achievements */}
				<div
					className={`backdrop-blur-sm rounded-2xl p-8 shadow-lg border ${
						theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
					}`}
				>
					<h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Nailiyyətlər</h3>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{mockAchievements.map((achievement, index) => (
							<motion.div
								key={achievement.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.1 }}
								className={`p-6 rounded-xl text-center border ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-200'}`}
							>
								<div className='text-4xl mb-3'>{achievement.icon}</div>
								<h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{achievement.title}</h4>
								<p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{achievement.description}</p>
								<p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
									{new Date(achievement.unlockedAt).toLocaleDateString('az-AZ')}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

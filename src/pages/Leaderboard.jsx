import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Calendar, Target, BookOpen, Headphones, Flame } from 'lucide-react';
import { leaderboardData, getTopUsers } from '../data/leaderboard';
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from '../store/slices/languageSlice';

const Leaderboard = () => {
	const currentLanguage = useSelector(selectCurrentLanguage);
	const theme = useSelector((state) => state.theme.mode);
	
	const topUsers = getTopUsers();
	const [first, second, third, ...others] = topUsers;

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

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1:
				return <Trophy size={24} className="text-yellow-500" />;
			case 2:
				return <Medal size={24} className="text-gray-400" />;
			case 3:
				return <Award size={24} className="text-amber-600" />;
			default:
				return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
		}
	};

	const PodiumCard = ({ user, rank, height }) => (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: rank * 0.2 }}
			className={`relative ${height} flex flex-col justify-end`}
		>
			{/* Podium Base */}
			<div className={`bg-gradient-to-t ${
				rank === 1 
					? 'from-yellow-400 to-yellow-300' 
					: rank === 2 
					? 'from-gray-300 to-gray-200' 
					: 'from-amber-500 to-amber-400'
			} rounded-t-2xl p-6 text-center relative overflow-hidden`}>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
				</div>
				
				{/* Rank Number */}
				<div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-6xl font-bold text-white/30">
					{rank}
				</div>
				
				{/* User Info */}
				<div className="relative z-10">
					<div className="relative mb-4">
						<img 
							src={user.avatar} 
							alt={user.name}
							className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
						/>
						{rank === 1 && (
							<div className="absolute -top-2 -right-2">
								<Crown size={24} className="text-yellow-600" />
							</div>
						)}
					</div>
					
					<h3 className="text-lg font-bold text-white mb-2">{user.name}</h3>
					<div className="flex items-center justify-center space-x-2 mb-2">
						<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(user.level)}`}>
							{user.level}
						</span>
					</div>
					<p className="text-2xl font-bold text-white">{user.score.toLocaleString()}</p>
					<p className="text-sm text-white/80">{currentLanguage === 'az' ? 'xal' : 'points'}</p>
				</div>
			</div>
		</motion.div>
	);

	return (
		<div className="min-h-screen pt-8 pb-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6">
						{currentLanguage === 'az' ? 'Liderlik Lövhəsi' : 'Leaderboard'}
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						{currentLanguage === 'az' 
							? 'Ən yaxşı öyrənənləri görün və onlarla yarışın!'
							: 'See the top learners and compete with them!'
						}
					</p>
				</div>

				{/* Podium - Top 3 */}
				<div className="flex items-end justify-center space-x-8 mb-16">
					{/* 2nd Place */}
					{second && (
						<PodiumCard user={second} rank={2} height="h-64" />
					)}
					
					{/* 1st Place */}
					{first && (
						<PodiumCard user={first} rank={1} height="h-80" />
					)}
					
					{/* 3rd Place */}
					{third && (
						<PodiumCard user={third} rank={3} height="h-48" />
					)}
				</div>

				{/* Other Rankings */}
				<div className={`backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden ${
					theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
				}`}>
					<div className="p-6 border-b border-gray-200">
						<h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Digər Rəqiblər' : 'Other Competitors'}
						</h2>
					</div>
					
					<div className="divide-y divide-gray-200">
						{others.map((user, index) => {
							const rank = index + 4;
							return (
								<motion.div
									key={user.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: (index + 3) * 0.1 }}
									className={`p-6 hover:bg-gray-50/50 transition-colors ${
										theme === 'dark' ? 'hover:bg-gray-700/30' : ''
									}`}
								>
									<div className="flex items-center space-x-6">
										{/* Rank */}
										<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
											{getRankIcon(rank)}
										</div>
										
										{/* Avatar */}
										<img 
											src={user.avatar} 
											alt={user.name}
											className="w-12 h-12 rounded-full"
										/>
										
										{/* User Info */}
										<div className="flex-1">
											<div className="flex items-center space-x-3 mb-1">
												<h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
													{user.name}
												</h3>
												<span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(user.level)}`}>
													{user.level}
												</span>
											</div>
											
											<div className="flex items-center space-x-4 text-sm text-gray-600">
												<div className="flex items-center space-x-1">
													<Target size={14} />
													<span>{user.score.toLocaleString()} {currentLanguage === 'az' ? 'xal' : 'pts'}</span>
												</div>
												<div className="flex items-center space-x-1">
													<BookOpen size={14} />
													<span>{user.wordsLearned} {currentLanguage === 'az' ? 'söz' : 'words'}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Headphones size={14} />
													<span>{user.storiesCompleted} {currentLanguage === 'az' ? 'hekayə' : 'stories'}</span>
												</div>
												<div className="flex items-center space-x-1">
													<Flame size={14} />
													<span>{user.streak} {currentLanguage === 'az' ? 'gün' : 'days'}</span>
												</div>
											</div>
										</div>
										
										{/* Join Date */}
										<div className="text-right">
											<div className="flex items-center space-x-1 text-sm text-gray-500">
												<Calendar size={14} />
												<span>{new Date(user.joinDate).toLocaleDateString()}</span>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* Stats Section */}
				<div className="grid md:grid-cols-3 gap-6 mt-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className={`backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						}`}
					>
						<Trophy size={32} className="mx-auto text-yellow-500 mb-3" />
						<h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Ən Yüksək Xal' : 'Highest Score'}
						</h3>
						<p className="text-2xl font-bold text-yellow-600">{first?.score.toLocaleString()}</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						className={`backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						}`}
					>
						<BookOpen size={32} className="mx-auto text-blue-500 mb-3" />
						<h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Ən Çox Söz' : 'Most Words'}
						</h3>
						<p className="text-2xl font-bold text-blue-600">{first?.wordsLearned.toLocaleString()}</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7 }}
						className={`backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border ${
							theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20' : 'bg-white/60 border-white/20'
						}`}
					>
						<Flame size={32} className="mx-auto text-orange-500 mb-3" />
						<h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
							{currentLanguage === 'az' ? 'Ən Uzun Sıra' : 'Longest Streak'}
						</h3>
						<p className="text-2xl font-bold text-orange-600">{first?.streak} {currentLanguage === 'az' ? 'gün' : 'days'}</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, Headphones, Home, User, LogOut, Book, Zap, Users, Crown, Menu, X, GraduationCap, Target, Calendar, Trophy, ChevronDown, Moon, Sun } from 'lucide-react';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { logout } from '../store/slices/authSlice';
import { selectHasPremiumAccess } from '../store/slices/subscriptionSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import AuthModal from './AuthModal';

const Navigation = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	// 🔹 Global state
	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);
	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const theme = useSelector((state) => state.theme.mode);

	// 🔹 Local state
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authMode, setAuthMode] = useState('login');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [showMoreDropdown, setShowMoreDropdown] = useState(false);

	// 🔹 Nav items (sabit liste, render’da değişmez)
	const navItems = useMemo(
		() => [
			// { path: '/', label: t.home, icon: Home },
			{ path: '/daily-words', label: currentLanguage === 'az' ? 'Hər Gün 10' : 'Daily 10', icon: Calendar },
			{ path: '/word-learning', label: t.wordLearning, icon: BookOpen },
			{ path: '/story-listening', label: t.storyListening, icon: Headphones },
			{ path: '/dictionary', label: t.dictionary, icon: Book },
			{ path: '/grammar', label: currentLanguage === 'az' ? 'Qrammatika' : 'Grammar', icon: GraduationCap },
			{ path: '/skills', label: currentLanguage === 'az' ? 'Bacarıqlar' : 'Skills', icon: Target },
			{ path: '/extra-features', label: t.extraFeatures, icon: Zap },
			{ path: '/teachers', label: t.teachers, icon: Users },
			{ path: '/leaderboard', label: currentLanguage === 'az' ? 'Liderlik' : 'Leaderboard', icon: Trophy },
			{ path: '/level-test', label: currentLanguage === 'az' ? 'Səviyyə Testi' : 'Level Test', icon: Target },
		],
		[t, currentLanguage]
	);

	const hasPremiumAccess = useSelector(selectHasPremiumAccess);

	const visibleNavItems = navItems.slice(0, 6);
	const moreNavItems = navItems.slice(6);
	const handleNavClick = (path) => {
		setIsMobileMenuOpen(false);
		setShowMoreDropdown(false);
	};

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<>
			<nav className={`backdrop-blur-md border-b sticky top-0 z-40 shadow-sm ${
				theme === 'dark' 
					? 'bg-gray-900/80 border-gray-700/20' 
					: 'bg-white/30 border-white/20'
			}`}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						{/* Logo */}
						<Link to='/' className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-shrink-0'>
							EnglishLearn
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-1'>
							{visibleNavItems.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									onClick={() => handleNavClick(path)}
									className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium relative ${
										location.pathname === path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
											: theme === 'dark'
											? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
											: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
								>
									<Icon size={16} />
									<span>{label}</span>
								</Link>
							))}
							
							{/* More Dropdown */}
							{moreNavItems.length > 0 && (
								<div className='relative'>
									<button
										onMouseEnter={() => setShowMoreDropdown(true)}
										onMouseLeave={() => setShowMoreDropdown(false)}
										className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
											theme === 'dark'
												? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
												: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
										}`}
									>
										<span>{currentLanguage === 'az' ? 'Daha çox' : 'More'}</span>
										<ChevronDown size={14} />
									</button>
									
									{showMoreDropdown && (
										<div 
											className={`absolute top-full right-0 mt-1 w-48 rounded-lg shadow-lg border z-50 ${
												theme === 'dark'
													? 'bg-gray-800 border-gray-700'
							<div className={`lg:hidden backdrop-blur-md border-t fixed inset-x-0 top-16 bottom-0 overflow-y-auto z-50 ${
											}`}
											onMouseEnter={() => setShowMoreDropdown(true)}
											onMouseLeave={() => setShowMoreDropdown(false)}
										>
											{moreNavItems.map(({ path, label, icon: Icon }) => (
												<Link
													key={path}
													to={path}
													onClick={() => handleNavClick(path)}
													className={`flex items-center space-x-2 px-4 py-3 transition-colors first:rounded-t-lg last:rounded-b-lg ${
														location.pathname === path
															? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
															: theme === 'dark'
															? 'text-gray-300 hover:bg-gray-700'
															: 'text-gray-600 hover:bg-gray-50'
													}`}
												>
													<Icon size={16} />
													<span className='text-sm font-medium'>{label}</span>
												</Link>
											))}
										</div>
									)}
								</div>
							)}
						</div>

						{/* Right Section */}
						<div className='flex items-center space-x-3'>
							{/* Theme Toggle */}
							<button
								onClick={() => dispatch(toggleTheme())}
								className={`p-2 rounded-lg transition-colors ${
									theme === 'dark'
										? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
										: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
								}`}
								title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
							>
								{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
							</button>

							{/* Subscription Button */}
							<Link
								to='/subscription'
								className='hidden sm:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm'
							>
								<Crown size={14} />
								<span>{t.subscription}</span>
							</Link>

							{/* Auth Section */}
							{isAuthenticated ? (
								<div className='hidden md:flex items-center space-x-3'>
									<div className={`flex items-center space-x-2 ${
										theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
									}`}>
										<User size={18} />
										<span className='font-medium text-sm'>{user?.name}</span>
									</div>
									<button
										onClick={() => dispatch(logout())}
										className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
											theme === 'dark'
												? 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
												: 'text-gray-600 hover:text-red-600 hover:bg-red-50'
										}`}
									>
										<LogOut size={14} />
										<span className='font-medium'>{currentLanguage === 'az' ? 'Çıxış' : 'Logout'}</span>
									</button>
								</div>
							) : (
								<div className='hidden md:flex items-center space-x-2'>
									<button
										onClick={() => {
											setAuthMode('login');
											setShowAuthModal(true);
										}}
										className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
											theme === 'dark'
												? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
												: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
										}`}
									>
										{currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
									</button>
									<button
										onClick={() => {
											setAuthMode('signup');
											setShowAuthModal(true);
										}}
										className='px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm'
									>
										{currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
									</button>
								</div>
							)}

							{/* Mobile Menu Button */}
							<button
								onClick={toggleMobileMenu}
								className={`lg:hidden p-2 rounded-lg transition-colors ${
									theme === 'dark'
										? 'text-gray-300 hover:text-white hover:bg-gray-800'
										: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
								}`}
							>
								{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className={`lg:hidden backdrop-blur-md border-t fixed inset-x-0 top-16 bottom-0 overflow-y-auto ${
						theme === 'dark'
							? 'bg-gray-900/95 border-gray-700'
							: 'bg-white/95 border-gray-200'
					}`}>
						<div className='px-4 py-3 space-y-2 h-full flex flex-col'>
							{navItems.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									onClick={() => handleNavClick(path)}
									className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
										location.pathname === path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
											: theme === 'dark'
											? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
											: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
								>
									<Icon size={20} />
									<span className='font-medium'>{label}</span>
								</Link>
							))}

							{/* Theme Toggle Mobile */}
							<button
								onClick={() => dispatch(toggleTheme())}
								className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
									theme === 'dark'
										? 'text-gray-300 hover:bg-gray-800'
										: 'text-gray-600 hover:bg-blue-50'
								}`}
							>
								{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
								<span className='font-medium'>
									{theme === 'dark' 
										? (currentLanguage === 'az' ? 'İşıqlı Rejim' : 'Light Mode')
										: (currentLanguage === 'az' ? 'Qaranlıq Rejim' : 'Dark Mode')
									}
								</span>
							</button>

							{/* Mobile Subscription */}
							{!hasPremiumAccess && (
								<Link
									to='/subscription'
									onClick={() => setIsMobileMenuOpen(false)}
									className='flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium shadow-md'
								>
									<Crown size={20} />
									<span>{t.subscription}</span>
								</Link>
							)}

							{/* Mobile Auth */}
							{isAuthenticated ? (
								<div className={`border-t pt-3 mt-3 ${
									theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
								}`}>
									<div className={`flex items-center space-x-3 px-3 py-2 ${
										theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
									}`}>
										<User size={20} />
										<span className='font-medium'>{user?.name}</span>
									</div>
									<button
										onClick={() => {
											dispatch(logout());
											setIsMobileMenuOpen(false);
										}}
										className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors w-full ${
											theme === 'dark'
												? 'text-red-400 hover:bg-gray-800'
												: 'text-red-600 hover:bg-red-50'
										}`}
									>
										<LogOut size={20} />
										<span className='font-medium'>{currentLanguage === 'az' ? 'Çıxış' : 'Logout'}</span>
									</button>
								</div>
							) : (
								<div className={`border-t pt-3 mt-3 space-y-2 ${
									theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
								}`}>
									<button
										onClick={() => {
											setAuthMode('login');
											setShowAuthModal(true);
											setIsMobileMenuOpen(false);
										}}
										className={`flex items-center justify-center w-full px-3 py-3 rounded-lg transition-colors font-medium ${
											theme === 'dark'
												? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
												: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
										}`}
									>
										{currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
									</button>
									<button
										onClick={() => {
											setAuthMode('signup');
											setShowAuthModal(true);
											setIsMobileMenuOpen(false);
										}}
										className='flex items-center justify-center w-full px-3 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md'
									>
										{currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</nav>

			<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
		</>
	);
};

export default Navigation;

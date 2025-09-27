import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Sun, Moon, User, LogOut, Crown } from 'lucide-react';
import { toggleTheme } from '../store/slices/themeSlice';
import { toggleLanguage, selectCurrentLanguage } from '../store/slices/languageSlice';
import { logout } from '../store/slices/authSlice';
import { selectHasPremiumAccess } from '../store/slices/subscriptionSlice';
import AuthModal from './AuthModal';

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
	
	const location = useLocation();
	const dispatch = useDispatch();
	
	const theme = useSelector((state) => state.theme.mode);
	const currentLanguage = useSelector(selectCurrentLanguage);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const hasPremiumAccess = useSelector(selectHasPremiumAccess);

	const navItems = [
		{ path: '/word-learning', label: currentLanguage === 'az' ? 'Söz Öyrən' : 'Learn Words' },
		{ path: '/story-listening', label: currentLanguage === 'az' ? 'Hekayə Dinlə' : 'Listen Stories' },
		{ path: '/dictionary', label: currentLanguage === 'az' ? 'Lüğət' : 'Dictionary' },
		{ path: '/grammar', label: currentLanguage === 'az' ? 'Qrammatika' : 'Grammar' },
		{ path: '/skills', label: currentLanguage === 'az' ? 'Bacarıqlar' : 'Skills' },
		{ path: '/games', label: currentLanguage === 'az' ? 'Oyunlarla Öyrən' : 'Learn with Games' },
		{ path: '/compete', label: currentLanguage === 'az' ? 'Yarış' : 'Compete' },
		{ path: '/extra-features', label: currentLanguage === 'az' ? 'Əlavə' : 'Extra' },
		{ path: '/teachers', label: currentLanguage === 'az' ? 'Müəllimlər' : 'Teachers' },
		{ path: '/daily-words', label: currentLanguage === 'az' ? 'Hər gün 10' : 'Daily 10' },
		{ path: '/leaderboard', label: currentLanguage === 'az' ? 'Liderlik' : 'Leaderboard' },
		{ path: '/level-test', label: currentLanguage === 'az' ? 'Səviyyə Testi' : 'Level Test' },
	];

	const handleAuthAction = (mode) => {
		setAuthModal({ isOpen: true, mode });
		setIsMenuOpen(false);
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
			} backdrop-blur-md border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<Link to='/' className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
							EnglishLearn
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-1 flex-wrap justify-center max-w-4xl'>
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
										location.pathname === item.path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
											: theme === 'dark'
											? 'text-gray-300 hover:text-white hover:bg-gray-800'
											: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
									}`}
								>
									{item.label}
								</Link>
							))}
						</div>

						{/* Desktop Actions */}
						<div className='hidden lg:flex items-center space-x-4'>
							{/* Language Toggle */}
							<button
								onClick={() => dispatch(toggleLanguage())}
								className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
									theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
								}`}
							>
								{currentLanguage === 'az' ? 'EN' : 'AZ'}
							</button>

							{/* Theme Toggle */}
							<button
								onClick={() => dispatch(toggleTheme())}
								className={`p-2 rounded-lg transition-colors ${
									theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
								}`}
							>
								{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
							</button>

							{/* Subscription Link - Only show if not premium */}
							{!hasPremiumAccess && (
								<Link
									to='/subscription'
									className='flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg'
								>
									<Crown size={16} />
									<span>{currentLanguage === 'az' ? 'Premium' : 'Premium'}</span>
								</Link>
							)}

							{/* Auth Actions */}
							{isAuthenticated ? (
								<div className='flex items-center space-x-3'>
									<Link
										to='/profile'
										className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
											theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
										}`}
									>
										<User size={16} />
										<span className='text-sm'>{user?.name}</span>
									</Link>
									<button
										onClick={handleLogout}
										className={`p-2 rounded-lg transition-colors ${
											theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
										}`}
									>
										<LogOut size={16} />
									</button>
								</div>
							) : (
								<div className='flex items-center space-x-2'>
									<button
										onClick={() => handleAuthAction('login')}
										className={`px-4 py-2 rounded-lg font-medium transition-colors ${
											theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
										}`}
									>
										{currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
									</button>
									<button
										onClick={() => handleAuthAction('signup')}
										className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg'
									>
										{currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
									</button>
								</div>
							)}
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMenu}
							className={`lg:hidden p-2 rounded-lg transition-colors ${
								theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
							}`}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className={`lg:hidden absolute top-full left-0 right-0 z-50 ${
						theme === 'dark' ? 'bg-gray-900/98' : 'bg-white/98'
					} backdrop-blur-md border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
						<div className='px-4 py-4 space-y-2'>
							{/* Navigation Links */}
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									onClick={closeMenu}
									className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
										location.pathname === item.path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
											: theme === 'dark'
											? 'text-gray-300 hover:text-white hover:bg-gray-800'
											: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
									}`}
								>
									{item.label}
								</Link>
							))}

							{/* Divider */}
							<div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} my-4`}></div>

							{/* Mobile Actions */}
							<div className='space-y-2'>
								{/* Language Toggle */}
								<button
									onClick={() => {
										dispatch(toggleLanguage());
										closeMenu();
									}}
									className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
										theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
									}`}
								>
									{currentLanguage === 'az' ? 'English' : 'Azərbaycan'}
								</button>

								{/* Theme Toggle */}
								<button
									onClick={() => {
										dispatch(toggleTheme());
										closeMenu();
									}}
									className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
										theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
									}`}
								>
									{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
									<span>{theme === 'dark' ? (currentLanguage === 'az' ? 'Açıq tema' : 'Light Mode') : (currentLanguage === 'az' ? 'Qaranlıq tema' : 'Dark Mode')}</span>
								</button>

								{/* Subscription Link - Only show if not premium */}
								{!hasPremiumAccess && (
									<Link
										to='/subscription'
										onClick={closeMenu}
										className='w-full text-left px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium flex items-center space-x-2'
									>
										<Crown size={20} />
										<span>{currentLanguage === 'az' ? 'Premium Al' : 'Get Premium'}</span>
									</Link>
								)}

								{/* Auth Actions */}
								{isAuthenticated ? (
									<>
										<Link
											to='/profile'
											onClick={closeMenu}
											className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
												theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
											}`}
										>
											<User size={20} />
											<span>{user?.name}</span>
										</Link>
										<button
											onClick={handleLogout}
											className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
												theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
											}`}
										>
											<LogOut size={20} />
											<span>{currentLanguage === 'az' ? 'Çıxış' : 'Logout'}</span>
										</button>
									</>
								) : (
									<>
										<button
											onClick={() => handleAuthAction('login')}
											className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
												theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
											}`}
										>
											{currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
										</button>
										<button
											onClick={() => handleAuthAction('signup')}
											className='w-full text-left px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium'
										>
											{currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				)}
			</nav>

			{/* Auth Modal */}
			<AuthModal
				isOpen={authModal.isOpen}
				onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
				initialMode={authModal.mode}
			/>
		</>
	);
};

export default Navigation;
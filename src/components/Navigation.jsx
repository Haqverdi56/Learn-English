import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Headphones, Home, User, LogOut, Book, Zap, Users, Crown, Menu, X, GraduationCap, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import AuthModal from './AuthModal';

const Navigation = () => {
	const location = useLocation();
	const { currentLanguage, translations } = useLanguage();
	const { user, logout, isAuthenticated } = useAuth();
	const { canAccessPage, isPageRestricted } = useSubscription();
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authMode, setAuthMode] = useState('login');
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const t = translations[currentLanguage];

	const navItems = [
		{ path: '/', label: t.home, icon: Home },
		{ path: '/word-learning', label: t.wordLearning, icon: BookOpen },
		{ path: '/story-listening', label: t.storyListening, icon: Headphones },
		{ path: '/dictionary', label: t.dictionary, icon: Book },
		{ path: '/grammar', label: currentLanguage === 'az' ? 'Qrammatika' : 'Grammar', icon: GraduationCap },
		{ path: '/skills', label: currentLanguage === 'az' ? 'Bacarıqlar' : 'Skills', icon: Target },
		{ path: '/extra-features', label: t.extraFeatures, icon: Zap },
		{ path: '/teachers', label: t.teachers, icon: Users },
	];

	const handleNavClick = (path, e) => {
		if (isPageRestricted(path) && !canAccessPage(path)) {
			e.preventDefault();
			window.location.href = '/subscription';
		}
		setIsMobileMenuOpen(false);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			<nav className='bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						{/* Logo */}
						<Link to='/' className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex-shrink-0'>
							EnglishLearn
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-1'>
							{navItems.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									onClick={(e) => handleNavClick(path, e)}
									className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium relative ${
										location.pathname === path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
											: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
								>
									<Icon size={16} />
									<span>{label}</span>
									{isPageRestricted(path) && <Crown size={12} className='text-yellow-500' />}
								</Link>
							))}
						</div>

						{/* Right Section */}
						<div className='flex items-center space-x-3'>
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
									<div className='flex items-center space-x-2 text-gray-700'>
										<User size={18} />
										<span className='font-medium text-sm'>{user?.name}</span>
									</div>
									<button
										onClick={logout}
										className='flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm'
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
										className='px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm'
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
								className='lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors'
							>
								{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className='lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200'>
						<div className='px-4 py-3 space-y-2'>
							{navItems.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									onClick={(e) => handleNavClick(path, e)}
									className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
										location.pathname === path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
											: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
								>
									<Icon size={20} />
									<span className='font-medium'>{label}</span>
									{isPageRestricted(path) && <Crown size={14} className='text-yellow-500 ml-auto' />}
								</Link>
							))}

							{/* Mobile Subscription */}
							<Link
								to='/subscription'
								onClick={() => setIsMobileMenuOpen(false)}
								className='flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium shadow-md'
							>
								<Crown size={20} />
								<span>{t.subscription}</span>
							</Link>

							{/* Mobile Auth */}
							{isAuthenticated ? (
								<div className='border-t border-gray-200 pt-3 mt-3'>
									<div className='flex items-center space-x-3 px-3 py-2 text-gray-700'>
										<User size={20} />
										<span className='font-medium'>{user?.name}</span>
									</div>
									<button
										onClick={() => {
											logout();
											setIsMobileMenuOpen(false);
										}}
										className='flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full'
									>
										<LogOut size={20} />
										<span className='font-medium'>{currentLanguage === 'az' ? 'Çıxış' : 'Logout'}</span>
									</button>
								</div>
							) : (
								<div className='border-t border-gray-200 pt-3 mt-3 space-y-2'>
									<button
										onClick={() => {
											setAuthMode('login');
											setShowAuthModal(true);
											setIsMobileMenuOpen(false);
										}}
										className='flex items-center justify-center w-full px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium'
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

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Headphones, Home, User, LogOut, Book, Zap, Users, Crown } from 'lucide-react';
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
	const t = translations[currentLanguage];

	const navItems = [
		{ path: '/', label: t.home, icon: Home },
		{ path: '/word-learning', label: t.wordLearning, icon: BookOpen },
		{ path: '/story-listening', label: t.storyListening, icon: Headphones },
		{ path: '/dictionary', label: t.dictionary, icon: Book },
		{ path: '/extra-features', label: t.extraFeatures, icon: Zap },
		{ path: '/teachers', label: t.teachers, icon: Users },
	];

	const handleNavClick = (path, e) => {
		if (isPageRestricted(path) && !canAccessPage(path)) {
			e.preventDefault();
			// Redirect to subscription page
			window.location.href = '/subscription';
		}
	};

	return (
		<nav className='bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center space-x-8'>
						<Link to='/' className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
							EnglishLearn
						</Link>
						<div className='hidden md:flex space-x-6'>
							{navItems.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									onClick={(e) => handleNavClick(path, e)}
									className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 relative ${
										location.pathname === path
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
											: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
									}`}
								>
									<Icon size={20} />
									<span className='font-medium'>{label}</span>
									{isPageRestricted(path) && <Crown size={14} className='text-yellow-500' />}
								</Link>
							))}
						</div>
					</div>

					{/* Auth Section */}
					<div className='flex items-center space-x-4'>
						<Link
							to='/subscription'
							className='flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg'
						>
							<Crown size={16} />
							<span>{t.subscription}</span>
						</Link>

						{isAuthenticated ? (
							<div className='flex items-center space-x-3'>
								<div className='flex items-center space-x-2 text-gray-700'>
									<User size={20} />
									<span className='font-medium'>{user?.name}</span>
								</div>
								<button
									onClick={logout}
									className='flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
								>
									<LogOut size={16} />
									<span className='font-medium'>{currentLanguage === 'az' ? 'Çıxış' : 'Logout'}</span>
								</button>
							</div>
						) : (
							<div className='flex items-center space-x-3'>
								<button
									onClick={() => {
										setAuthMode('login');
										setShowAuthModal(true);
									}}
									className='px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium'
								>
									{currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
								</button>
								<button
									onClick={() => {
										setAuthMode('signup');
										setShowAuthModal(true);
									}}
									className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg'
								>
									{currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
		</nav>
	);
};

export default Navigation;

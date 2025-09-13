import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
	const [mode, setMode] = useState(initialMode);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { login, signup } = useAuth();
	const { currentLanguage } = useLanguage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (mode === 'login') {
				await login(email, password);
			} else {
				await signup(email, password, name);
			}
			onClose();
			resetForm();
		} catch (err) {
			setError(currentLanguage === 'az' ? 'Xəta baş verdi' : 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setName('');
		setError('');
		setShowPassword(false);
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4'
				onClick={handleClose}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					exit={{ scale: 0.8, opacity: 0, y: 20 }}
					transition={{ type: 'spring', duration: 0.5 }}
					className='bg-white/95 backdrop-blur-xl rounded-3xl max-w-md w-full shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto'
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className='relative p-8 pb-6'>
						<div className='absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-t-3xl'></div>
						<div className='relative flex items-center justify-between'>
							<div>
								<h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
									{mode === 'login' ? (currentLanguage === 'az' ? 'Daxil ol' : 'Welcome Back') : currentLanguage === 'az' ? 'Qeydiyyat' : 'Join Us'}
								</h2>
								<p className='text-gray-600 mt-2'>
									{mode === 'login'
										? currentLanguage === 'az'
											? 'Hesabınıza daxil olun'
											: 'Sign in to your account'
										: currentLanguage === 'az'
										? 'Yeni hesab yaradın'
										: 'Create your new account'}
								</p>
							</div>
							<button
								onClick={handleClose}
								className='p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200'
							>
								<X size={24} />
							</button>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='px-8 pb-8 space-y-6'>
						{mode === 'signup' && (
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-3'>{currentLanguage === 'az' ? 'Ad Soyad' : 'Full Name'}</label>
								<div className='relative'>
									<User size={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500'
										placeholder={currentLanguage === 'az' ? 'Adınızı daxil edin' : 'Enter your full name'}
										required
									/>
								</div>
							</div>
						)}

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-3'>{currentLanguage === 'az' ? 'E-poçt ünvanı' : 'Email Address'}</label>
							<div className='relative'>
								<Mail size={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500'
									placeholder={currentLanguage === 'az' ? 'E-poçt ünvanınızı daxil edin' : 'Enter your email address'}
									required
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-semibold text-gray-700 mb-3'>{currentLanguage === 'az' ? 'Şifrə' : 'Password'}</label>
							<div className='relative'>
								<Lock size={20} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full pl-12 pr-14 py-4 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500'
									placeholder={currentLanguage === 'az' ? 'Şifrənizi daxil edin' : 'Enter your password'}
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className='text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200'
							>
								{error}
							</motion.div>
						)}

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]'
						>
							{loading ? (
								<div className='flex items-center justify-center'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3'></div>
									{currentLanguage === 'az' ? 'Gözləyin...' : 'Loading...'}
								</div>
							) : mode === 'login' ? (
								currentLanguage === 'az' ? (
									'Daxil ol'
								) : (
									'Sign In'
								)
							) : currentLanguage === 'az' ? (
								'Hesab yarat'
							) : (
								'Create Account'
							)}
						</button>
					</form>

					{/* Footer */}
					<div className='px-8 pb-8'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-200'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-4 bg-white text-gray-500'>
									{mode === 'login'
										? currentLanguage === 'az'
											? 'Hesabınız yoxdur?'
											: "Don't have an account?"
										: currentLanguage === 'az'
										? 'Artıq hesabınız var?'
										: 'Already have an account?'}
								</span>
							</div>
						</div>
						<div className='mt-6 text-center'>
							<button
								onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
								className='text-blue-600 hover:text-blue-800 font-semibold transition-colors'
							>
								{mode === 'login'
									? currentLanguage === 'az'
										? 'Qeydiyyatdan keç'
										: 'Create Account'
									: currentLanguage === 'az'
									? 'Daxil ol'
									: 'Sign In'}
							</button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default AuthModal;

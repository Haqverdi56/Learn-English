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
				className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4'
				onClick={handleClose}
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					className='bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto mt-150'
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className='flex items-center justify-between p-6 border-b border-gray-100'>
						<h2 className='text-2xl font-bold text-gray-800'>
							{mode === 'login' ? (currentLanguage === 'az' ? 'Daxil ol' : 'Login') : currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up'}
						</h2>
						<button onClick={handleClose} className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
							<X size={20} />
						</button>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='p-6 space-y-4'>
						{mode === 'signup' && (
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Ad' : 'Name'}</label>
								<div className='relative'>
									<User size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
									<input
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
										placeholder={currentLanguage === 'az' ? 'Adınızı daxil edin' : 'Enter your name'}
										required
									/>
								</div>
							</div>
						)}

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'E-poçt' : 'Email'}</label>
							<div className='relative'>
								<Mail size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
									placeholder={currentLanguage === 'az' ? 'E-poçt ünvanınızı daxil edin' : 'Enter your email'}
									required
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>{currentLanguage === 'az' ? 'Şifrə' : 'Password'}</label>
							<div className='relative'>
								<Lock size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
									placeholder={currentLanguage === 'az' ? 'Şifrənizi daxil edin' : 'Enter your password'}
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{error && <div className='text-red-600 text-sm bg-red-50 p-3 rounded-lg'>{error}</div>}

						<button
							type='submit'
							disabled={loading}
							className='w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? (
								<div className='flex items-center justify-center'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
									{currentLanguage === 'az' ? 'Gözləyin...' : 'Loading...'}
								</div>
							) : mode === 'login' ? (
								currentLanguage === 'az' ? (
									'Daxil ol'
								) : (
									'Login'
								)
							) : currentLanguage === 'az' ? (
								'Qeydiyyat'
							) : (
								'Sign Up'
							)}
						</button>
					</form>

					{/* Footer */}
					<div className='p-6 bg-gray-50 rounded-b-2xl text-center'>
						<p className='text-gray-600'>
							{mode === 'login'
								? currentLanguage === 'az'
									? 'Hesabınız yoxdur?'
									: "Don't have an account?"
								: currentLanguage === 'az'
								? 'Artıq hesabınız var?'
								: 'Already have an account?'}
							<button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className='ml-2 text-blue-600 hover:text-blue-800 font-medium'>
								{mode === 'login' ? (currentLanguage === 'az' ? 'Qeydiyyat' : 'Sign Up') : currentLanguage === 'az' ? 'Daxil ol' : 'Login'}
							</button>
						</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default AuthModal;

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAuth } from '../contexts/AuthContext';

const Subscription = () => {
	const { currentLanguage, translations } = useLanguage();
	const { subscription, subscribe } = useSubscription();
	const { isAuthenticated } = useAuth();
	const t = translations[currentLanguage];

	const features = {
		free: [
			currentLanguage === 'az' ? 'Söz öyrənmə kartları' : 'Word learning cards',
			currentLanguage === 'az' ? 'Hekayə dinləmə' : 'Story listening',
			currentLanguage === 'az' ? 'Əsas səviyyə materialları' : 'Basic level materials',
			currentLanguage === 'az' ? 'Məhdud söz sayı' : 'Limited word count',
		],
		premium: [
			currentLanguage === 'az' ? 'Bütün pulsuz funksiyalar' : 'All free features',
			currentLanguage === 'az' ? 'Lüğət səhifəsi' : 'Dictionary access',
			currentLanguage === 'az' ? 'Əlavə funksiyalar' : 'Extra features',
			currentLanguage === 'az' ? 'Phrasal verbs və idiomlar' : 'Phrasal verbs & idioms',
			currentLanguage === 'az' ? 'Sınonimlər və antonimlər' : 'Synonyms & antonyms',
			currentLanguage === 'az' ? 'Müəllim profillərini görə bilmə' : 'Teacher profiles access',
			currentLanguage === 'az' ? 'Prioritet dəstək' : 'Priority support',
		],
	};

	const handleSubscribe = () => {
		if (!isAuthenticated) {
			alert(currentLanguage === 'az' ? 'Abunə olmaq üçün daxil olun' : 'Please login to subscribe');
			return;
		}

		subscribe();
		alert(currentLanguage === 'az' ? 'Uğurla abunə oldunuz!' : 'Successfully subscribed!');
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6'>
						{t.subscription}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'İngilis dilini öyrənmək üçün ən yaxşı planı seçin və bütün funksiyalardan yararlanın.'
							: 'Choose the best plan for learning English and unlock all features.'}
					</p>
				</div>

				{/* Current Subscription Status */}
				{subscription.isPremium && (
					<div className='bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 mb-8 text-center'>
						<div className='flex items-center justify-center space-x-2 mb-2'>
							<Crown size={24} />
							<h2 className='text-2xl font-bold'>{currentLanguage === 'az' ? 'Premium Üzv' : 'Premium Member'}</h2>
						</div>
						<p>
							{currentLanguage === 'az'
								? `Abunəliyiniz ${new Date(subscription.expiresAt).toLocaleDateString()} tarixinə qədər aktivdir.`
								: `Your subscription is active until ${new Date(subscription.expiresAt).toLocaleDateString()}.`}
						</p>
					</div>
				)}

				{/* Pricing Cards */}
				<div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
					{/* Free Plan */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 relative'
					>
						<div className='text-center mb-8'>
							<h3 className='text-2xl font-bold text-gray-800 mb-2'>{currentLanguage === 'az' ? 'Pulsuz' : 'Free'}</h3>
							<div className='text-4xl font-bold text-gray-800 mb-2'>
								₼0
								<span className='text-lg font-normal text-gray-600'>/{currentLanguage === 'az' ? 'həmişə' : 'forever'}</span>
							</div>
							<p className='text-gray-600'>{currentLanguage === 'az' ? 'Əsas funksiyalar' : 'Basic features'}</p>
						</div>

						<ul className='space-y-4 mb-8'>
							{features.free.map((feature, index) => (
								<li key={index} className='flex items-center space-x-3'>
									<Check size={20} className='text-green-500 flex-shrink-0' />
									<span className='text-gray-700'>{feature}</span>
								</li>
							))}
						</ul>

						<button disabled className='w-full py-3 px-6 bg-gray-200 text-gray-500 rounded-xl font-medium cursor-not-allowed'>
							{currentLanguage === 'az' ? 'Cari Plan' : 'Current Plan'}
						</button>
					</motion.div>

					{/* Premium Plan */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border-2 border-yellow-200 relative'
					>
						{/* Popular Badge */}
						<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
							<div className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1'>
								<Star size={16} />
								<span>{currentLanguage === 'az' ? 'Məşhur' : 'Popular'}</span>
							</div>
						</div>

						<div className='text-center mb-8 mt-4'>
							<h3 className='text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-2'>
								<Crown size={24} className='text-yellow-500' />
								<span>Premium</span>
							</h3>
							<div className='text-4xl font-bold text-gray-800 mb-2'>
								₼10
								<span className='text-lg font-normal text-gray-600'>/{currentLanguage === 'az' ? 'ay' : 'month'}</span>
							</div>
							<p className='text-gray-600'>{currentLanguage === 'az' ? 'Bütün funksiyalar' : 'All features included'}</p>
						</div>

						<ul className='space-y-4 mb-8'>
							{features.premium.map((feature, index) => (
								<li key={index} className='flex items-center space-x-3'>
									<Check size={20} className='text-green-500 flex-shrink-0' />
									<span className='text-gray-700'>{feature}</span>
								</li>
							))}
						</ul>

						<button
							onClick={handleSubscribe}
							disabled={subscription.isPremium}
							className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
								subscription.isPremium
									? 'bg-green-500 text-white cursor-not-allowed'
									: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl'
							}`}
						>
							{subscription.isPremium ? (
								<>
									<Check size={20} />
									<span>{currentLanguage === 'az' ? 'Aktiv' : 'Active'}</span>
								</>
							) : (
								<>
									<Zap size={20} />
									<span>{currentLanguage === 'az' ? 'Premium-a Keç' : 'Upgrade to Premium'}</span>
								</>
							)}
						</button>
					</motion.div>
				</div>

				{/* FAQ Section */}
				<div className='mt-16 max-w-3xl mx-auto'>
					<h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
						{currentLanguage === 'az' ? 'Tez-tez Verilən Suallar' : 'Frequently Asked Questions'}
					</h2>

					<div className='space-y-6'>
						<div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								{currentLanguage === 'az' ? 'Premium abunəliyi necə ləğv edə bilərəm?' : 'How can I cancel my premium subscription?'}
							</h3>
							<p className='text-gray-600'>
								{currentLanguage === 'az'
									? 'İstədiyiniz vaxt abunəliyinizi ləğv edə bilərsiniz. Ləğv etdikdən sonra cari dövrün sonuna qədər premium funksiyalardan istifadə edə bilərsiniz.'
									: 'You can cancel your subscription at any time. After cancellation, you can continue using premium features until the end of the current billing period.'}
							</p>
						</div>

						<div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								{currentLanguage === 'az' ? 'Ödəniş təhlükəsizdirmi?' : 'Is payment secure?'}
							</h3>
							<p className='text-gray-600'>
								{currentLanguage === 'az'
									? 'Bəli, bütün ödənişlər SSL şifrələməsi ilə qorunur və təhlükəsiz ödəniş sistemləri istifadə edilir.'
									: 'Yes, all payments are protected with SSL encryption and we use secure payment systems.'}
							</p>
						</div>

						<div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20'>
							<h3 className='text-lg font-semibold text-gray-800 mb-2'>
								{currentLanguage === 'az' ? 'Pulsuz versiyada nə var?' : "What's included in the free version?"}
							</h3>
							<p className='text-gray-600'>
								{currentLanguage === 'az'
									? 'Pulsuz versiyada söz öyrənmə kartları, hekayə dinləmə və əsas səviyyə materialları daxildir.'
									: 'The free version includes word learning cards, story listening, and basic level materials.'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Subscription;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, Headphones, Award, Users, Book, GraduationCap, Target, Zap, Crown } from 'lucide-react';

const Home = () => {
	const theme = useSelector((state) => state.theme.mode);

	const features = [
		{
			icon: BookOpen,
			title: 'Söz Öyrən',
			description: 'İnteraktiv kartlarla yeni sözlər öyrənin',
			path: '/word-learning',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			icon: Headphones,
			title: 'Hekayə Dinlə',
			description: 'Maraqlı hekayələrlə dinləmə qabiliyyətinizi inkişaf etdirin',
			path: '/story-listening',
			color: 'from-purple-500 to-pink-500',
		},
		{
			icon: Book,
			title: 'Lüğət',
			description: 'Geniş lüğət bazasından istədiyiniz sözü tapın',
			path: '/dictionary',
			color: 'from-green-500 to-emerald-500',
			isPremium: true,
		},
		{
			icon: GraduationCap,
			title: 'Qrammatika',
			description: 'İngilis dilinin qrammatika qaydalarını öyrənin',
			path: '/grammar',
			color: 'from-orange-500 to-red-500',
			isPremium: true,
		},
		{
			icon: Target,
			title: 'Bacarıqlar',
			description: '4 əsas bacarığınızı inkişaf etdirin',
			path: '/skills',
			color: 'from-indigo-500 to-purple-500',
			isPremium: true,
		},
		{
			icon: Zap,
			title: 'Əlavə Funksiyalar',
			description: 'Phrasal verbs, idiomlar və daha çox',
			path: '/extra-features',
			color: 'from-pink-500 to-rose-500',
			isPremium: true,
		},
		{
			icon: Users,
			title: 'Müəllimlər',
			description: 'Təcrübəli müəllimlərlə öyrənin',
			path: '/teachers',
			color: 'from-teal-500 to-cyan-500',
		},
	];

	const stats = [
		{ number: '10', label: 'Günlük Söz' },
		{ number: '5000+', label: 'Söz' },
		{ number: '100+', label: 'Hekayə' },
		{ number: '50+', label: 'Qrammatika Mövzusu' },
		{ number: '20+', label: 'Müəllim' },
		{ number: '10K+', label: 'Öyrənən' },
	];

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden'>
				{/* Background Image */}
				<div className='absolute inset-0 z-0'>
					<img 
						src='https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2'
						alt='London Big Ben'
						className='w-full h-full object-cover opacity-20'
					/>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80'></div>
				</div>
				
				<div className='max-w-7xl mx-auto text-center'>
					<h1 className='text-5xl md:text-7xl font-bold mb-8'>
						<span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>İngilis Dilini</span>
						<br />
						<span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Öyrənin</span>
					</h1>
					<p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
						İnteraktiv kartlar, maraqlı hekayələr və təcrübəli müəllimlərlə İngilis dilini asanlıqla öyrənin. Hər səviyyə üçün uyğun materiallar.
					</p>

					{/* Stats */}
					<div className='flex flex-wrap justify-center gap-8 md:gap-16 mb-16'>
						{stats.map((stat, index) => (
							<div key={index} className='text-center'>
								<div className='text-3xl md:text-4xl font-bold text-blue-600 mb-2'>{stat.number}</div>
								<div className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
						Öyrənmə Funksiyaları
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{features.map((feature, index) => (
							<Link
								key={index}
								to={feature.path}
								className={`group relative backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
									theme === 'dark' ? 'bg-gray-800/60 border-gray-700/20 hover:bg-gray-800/80' : 'bg-white/60 border-white/20 hover:bg-white/80'
								}`}
							>
								<div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
									<feature.icon size={32} className='text-white' />
								</div>
								<h3 className={`text-2xl font-bold mb-4 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
									<span>{feature.title}</span>
									{feature.isPremium && <Crown size={20} className='text-yellow-500 ml-2' />}
								</h3>
								<p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
								<div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
										<span className='text-white text-sm'>→</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<div className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-white'>
						<h2 className='text-3xl md:text-4xl font-bold mb-6'>İndi Başlayın!</h2>
						<p className='text-xl mb-8 opacity-90'>Minglərlə insan bizim platformamızda İngilis dilini öyrənir.</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								to='/word-learning'
								className='inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl'
							>
								Pulsuz Başla
							</Link>
							<Link
								to='/subscription'
								className='inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center'
							>
								<Crown size={20} className='mr-2' />
								Premium Al
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
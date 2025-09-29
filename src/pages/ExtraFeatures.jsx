import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Shuffle, Heart, Zap } from 'lucide-react';
import { selectCurrentLanguage, selectTranslations } from '../store/slices/languageSlice';
import { useSelector } from 'react-redux';
import { selectHasPremiumAccess } from '../store/slices/subscriptionSlice';

const ExtraFeatures = () => {
	const [selectedFeature, setSelectedFeature] = useState('phrasal-verbs');
	const currentLanguage = useSelector(selectCurrentLanguage);
	const t = useSelector(selectTranslations);

	const hasPremiumAccess = useSelector(selectHasPremiumAccess);

	if (!hasPremiumAccess) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-800 mb-4'>
						{currentLanguage === 'az' ? 'Premium Funksiya' : 'Premium Feature'}
					</h2>
					<p className='text-gray-600 mb-6'>
						{currentLanguage === 'az'
							? 'Bu səhifəyə daxil olmaq üçün premium abunəlik lazımdır.'
							: 'Premium subscription required to access this page.'}
					</p>
					<a
						href='/subscription'
						className='px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all duration-200'
					>
						{currentLanguage === 'az' ? 'Abunə ol' : 'Subscribe Now'}
					</a>
				</div>
			</div>
		);
	}

	const features = [
		{
			id: 'phrasal-verbs',
			title: currentLanguage === 'az' ? 'Phrasal Verbs' : 'Phrasal Verbs',
			description: currentLanguage === 'az' ? 'İngilis dilində phrasal verbs öyrənin' : 'Learn English phrasal verbs',
			icon: BookOpen,
			color: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'synonyms',
			title: currentLanguage === 'az' ? 'Sinonimlər' : 'Synonyms',
			description: currentLanguage === 'az' ? 'Sözlərin sinonimləri ilə lüğət ehtiyatınızı artırın' : 'Expand vocabulary with word synonyms',
			icon: Shuffle,
			color: 'from-green-500 to-emerald-500',
		},
		{
			id: 'antonyms',
			title: currentLanguage === 'az' ? 'Antonimlər' : 'Antonyms',
			description: currentLanguage === 'az' ? 'Sözlərin əks mənalarını öyrənin' : 'Learn opposite meanings of words',
			icon: Heart,
			color: 'from-red-500 to-pink-500',
		},
		{
			id: 'idioms',
			title: currentLanguage === 'az' ? 'İdiomlar' : 'Idioms',
			description: currentLanguage === 'az' ? 'İngilis dilinin idiomlarını kəşf edin' : 'Discover English idioms',
			icon: Zap,
			color: 'from-purple-500 to-indigo-500',
		},
		{
			id: 'irregular-verbs',
			title: currentLanguage === 'az' ? 'Qaydasız Feillər' : 'Irregular Verbs',
			description: currentLanguage === 'az' ? 'İngilis dilinin qaydasız feillərini öyrənin' : 'Learn English irregular verbs',
			icon: BookOpen,
			color: 'from-teal-500 to-cyan-500',
		},
		{
			id: 'grammar-comparison',
			title: currentLanguage === 'az' ? 'Qrammatika Müqayisəsi' : 'Grammar Comparison',
			description: currentLanguage === 'az' ? 'Azərbaycan və İngilis dilinin qrammatika fərqləri' : 'Grammar differences between Azerbaijani and English',
			icon: BookOpen,
			color: 'from-indigo-500 to-blue-500',
		},
		{
			id: 'common-mistakes',
			title: currentLanguage === 'az' ? 'Tipik Səhvlər' : 'Common Mistakes',
			description: currentLanguage === 'az' ? 'Azərbaycanlıların ən çox etdiyi səhvlər' : 'Most common mistakes made by Azerbaijani speakers',
			icon: Zap,
			color: 'from-red-500 to-orange-500',
		},
	];

	const phrasalVerbs = [
		{ verb: 'Give up', meaning: 'Təslim olmaq', example: "Don't give up on your dreams." },
		{ verb: 'Look after', meaning: 'Baxmaq, qayğısına qalmaq', example: 'She looks after her younger brother.' },
		{ verb: 'Turn on', meaning: 'Açmaq (cihaz)', example: 'Please turn on the lights.' },
		{ verb: 'Put off', meaning: 'Təxirə salmaq', example: 'We had to put off the meeting.' },
	];

	const synonymsData = [
		{ word: 'Happy', synonyms: ['Joyful', 'Cheerful', 'Delighted', 'Pleased'] },
		{ word: 'Big', synonyms: ['Large', 'Huge', 'Enormous', 'Massive'] },
		{ word: 'Good', synonyms: ['Excellent', 'Great', 'Wonderful', 'Amazing'] },
		{ word: 'Fast', synonyms: ['Quick', 'Rapid', 'Swift', 'Speedy'] },
	];

	const antonymsData = [
		{ word: 'Hot', antonym: 'Cold', example: 'The weather is hot today, but yesterday it was cold.' },
		{ word: 'Big', antonym: 'Small', example: 'He has a big house, but I have a small apartment.' },
		{ word: 'Happy', antonym: 'Sad', example: 'She was happy yesterday, but today she seems sad.' },
		{ word: 'Fast', antonym: 'Slow', example: 'The car is fast, but the truck is slow.' },
	];

	const idioms = [
		{ idiom: 'Break a leg', meaning: 'Uğurlar diləmək', example: 'Break a leg in your performance tonight!' },
		{ idiom: "It's raining cats and dogs", meaning: 'Çox güclü yağış yağır', example: "We can't go out, it's raining cats and dogs." },
		{ idiom: 'Piece of cake', meaning: 'Çox asan', example: 'The exam was a piece of cake.' },
		{ idiom: 'Hit the books', meaning: 'Dərs oxumaq', example: "I need to hit the books for tomorrow's test." },
	];

	const irregularVerbs = [
		{ base: 'be', past: 'was/were', pastParticiple: 'been', meaning: 'olmaq', example: 'I am happy. / I was happy yesterday. / I have been happy.' },
		{
			base: 'go',
			past: 'went',
			pastParticiple: 'gone',
			meaning: 'getmək',
			example: 'I go to school. / I went yesterday. / I have gone there before.',
		},
		{
			base: 'do',
			past: 'did',
			pastParticiple: 'done',
			meaning: 'etmək',
			example: 'I do my homework. / I did it yesterday. / I have done it already.',
		},
		{
			base: 'have',
			past: 'had',
			pastParticiple: 'had',
			meaning: 'sahib olmaq',
			example: 'I have a car. / I had one before. / I have had it for years.',
		},
		{ base: 'say', past: 'said', pastParticiple: 'said', meaning: 'demək', example: 'I say hello. / I said goodbye. / I have said it many times.' },
		{
			base: 'get',
			past: 'got',
			pastParticiple: 'gotten/got',
			meaning: 'əldə etmək',
			example: 'I get up early. / I got up late. / I have gotten used to it.',
		},
		{
			base: 'make',
			past: 'made',
			pastParticiple: 'made',
			meaning: 'etmək/yaratmaq',
			example: 'I make coffee. / I made dinner. / I have made a mistake.',
		},
		{
			base: 'know',
			past: 'knew',
			pastParticiple: 'known',
			meaning: 'bilmək',
			example: 'I know you. / I knew him well. / I have known her for years.',
		},
		{
			base: 'think',
			past: 'thought',
			pastParticiple: 'thought',
			meaning: 'düşünmək',
			example: 'I think so. / I thought about it. / I have thought of a solution.',
		},
		{
			base: 'take',
			past: 'took',
			pastParticiple: 'taken',
			meaning: 'götürmək',
			example: 'I take the bus. / I took a taxi. / I have taken this route before.',
		},
	];

	const grammarComparisons = [
		{
			topic: 'Artikl (Articles)',
			azerbaijani: 'Azərbaycan dilində artikl yoxdur',
			english: 'İngilis dilində "a/an" və "the" artiklları var',
			example: {
				az: 'Mən kitab oxuyuram',
				en: 'I am reading a book / I am reading the book'
			}
		},
		{
			topic: 'Fel zamanları (Verb Tenses)',
			azerbaijani: 'Azərbaycan dilində 6 əsas zaman var',
			english: 'İngilis dilində 12 əsas zaman var',
			example: {
				az: 'Mən yazıram / Mən yazmışam',
				en: 'I write / I am writing / I have written / I have been writing'
			}
		},
		{
			topic: 'Sözlərin sırası (Word Order)',
			azerbaijani: 'Azərbaycan dilində SOV (Subyekt-Obyekt-Fel)',
			english: 'İngilis dilində SVO (Subyekt-Fel-Obyekt)',
			example: {
				az: 'Mən kitab oxuyuram',
				en: 'I read book (I read a book)'
			}
		}
	];

	const commonMistakes = [
		{
			azerbaijani: 'Mən evdəyəm',
			mistake: 'I am in home',
			correct: 'I am at home',
			explanation: '"Home" sözündən əvvəl "at" istifadə edilir, "in" deyil.'
		},
		{
			azerbaijani: 'Mən 25 yaşındayam',
			mistake: 'I have 25 years old',
			correct: 'I am 25 years old',
			explanation: 'Yaş bildirmək üçün "be" feli istifadə edilir, "have" deyil.'
		},
		{
			azerbaijani: 'Mən ingilis dili öyrənirəm',
			mistake: 'I learn English',
			correct: 'I am learning English',
			explanation: 'Hazırda davam edən hərəkət üçün Present Continuous istifadə edilir.'
		},
		{
			azerbaijani: 'Mən məktəbə gedirəm',
			mistake: 'I go to school with bus',
			correct: 'I go to school by bus',
			explanation: 'Nəqliyyat vasitəsi bildirmək üçün "by" istifadə edilir, "with" deyil.'
		}
	];

	const renderContent = () => {
		switch (selectedFeature) {
			case 'phrasal-verbs':
				return (
					<div className='space-y-4'>
						{phrasalVerbs.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<h3 className='text-xl font-bold text-blue-600 mb-2'>{item.verb}</h3>
								<p className='text-gray-700 mb-2'>{item.meaning}</p>
								<p className='text-gray-600 italic'>"{item.example}"</p>
							</motion.div>
						))}
					</div>
				);

			case 'synonyms':
				return (
					<div className='space-y-4'>
						{synonymsData.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<h3 className='text-xl font-bold text-green-600 mb-3'>{item.word}</h3>
								<div className='flex flex-wrap gap-2'>
									{item.synonyms.map((synonym, idx) => (
										<span key={idx} className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium'>
											{synonym}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				);

			case 'antonyms':
				return (
					<div className='space-y-4'>
						{antonymsData.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<div className='flex items-center space-x-4 mb-3'>
									<span className='px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium'>{item.word}</span>
									<ArrowRight size={20} className='text-gray-400' />
									<span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium'>{item.antonym}</span>
								</div>
								<p className='text-gray-600 italic'>"{item.example}"</p>
							</motion.div>
						))}
					</div>
				);

			case 'idioms':
				return (
					<div className='space-y-4'>
						{idioms.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<h3 className='text-xl font-bold text-purple-600 mb-2'>"{item.idiom}"</h3>
								<p className='text-gray-700 mb-2'>{item.meaning}</p>
								<p className='text-gray-600 italic'>"{item.example}"</p>
							</motion.div>
						))}
					</div>
				);

			case 'grammar-comparison':
				return (
					<div className='space-y-6'>
						{grammarComparisons.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<h3 className='text-xl font-bold text-indigo-600 mb-4'>{item.topic}</h3>
								
								<div className='grid md:grid-cols-2 gap-6 mb-4'>
									<div className='bg-blue-50 p-4 rounded-lg'>
										<h4 className='font-semibold text-blue-800 mb-2'>🇦🇿 Azərbaycan dili</h4>
										<p className='text-blue-700'>{item.azerbaijani}</p>
									</div>
									<div className='bg-green-50 p-4 rounded-lg'>
										<h4 className='font-semibold text-green-800 mb-2'>🇬🇧 İngilis dili</h4>
										<p className='text-green-700'>{item.english}</p>
									</div>
								</div>
								
								<div className='bg-gray-50 p-4 rounded-lg'>
									<h4 className='font-semibold text-gray-800 mb-2'>📝 Nümunə</h4>
									<div className='space-y-2'>
										<p><strong>AZ:</strong> {item.example.az}</p>
										<p><strong>EN:</strong> {item.example.en}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				);

			case 'common-mistakes':
				return (
					<div className='space-y-4'>
						{commonMistakes.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<div className='mb-4'>
									<h4 className='font-semibold text-gray-700 mb-2'>
										{currentLanguage === 'az' ? 'Azərbaycan dilində:' : 'In Azerbaijani:'}
									</h4>
									<p className='text-blue-600 font-medium'>{item.azerbaijani}</p>
								</div>
								
								<div className='grid md:grid-cols-2 gap-4 mb-4'>
									<div className='bg-red-50 p-4 rounded-lg border border-red-200'>
										<h4 className='font-semibold text-red-800 mb-2'>❌ Səhv</h4>
										<p className='text-red-700'>{item.mistake}</p>
									</div>
									<div className='bg-green-50 p-4 rounded-lg border border-green-200'>
										<h4 className='font-semibold text-green-800 mb-2'>✅ Doğru</h4>
										<p className='text-green-700'>{item.correct}</p>
									</div>
								</div>
								
								<div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
									<h4 className='font-semibold text-blue-800 mb-2'>💡 İzahat</h4>
									<p className='text-blue-700'>{item.explanation}</p>
								</div>
							</motion.div>
						))}
					</div>
				);

			case 'irregular-verbs':
				return (
					<div className='space-y-4'>
						{irregularVerbs.map((verb, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className='bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20'
							>
								<div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-3'>
									<div>
										<strong className='text-teal-600'>Base:</strong> {verb.base}
									</div>
									<div>
										<strong className='text-teal-600'>Past:</strong> {verb.past}
									</div>
									<div>
										<strong className='text-teal-600'>Past Participle:</strong> {verb.pastParticiple}
									</div>
									<div>
										<strong className='text-teal-600'>Meaning:</strong> {verb.meaning}
									</div>
								</div>
								<p className='text-gray-600 italic'>"{verb.example}"</p>
							</motion.div>
						))}
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen pt-8 pb-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>
						{t.extraFeatures}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{currentLanguage === 'az'
							? 'İngilis dilini öyrənmək üçün əlavə alətlər və funksiyalar.'
							: 'Additional tools and features to enhance your English learning experience.'}
					</p>
				</div>

				<div className='grid lg:grid-cols-4 gap-8'>
					{/* Feature Cards */}
					<div className='lg:col-span-1 space-y-4'>
						{features.map((feature) => (
							<motion.div
								key={feature.id}
								whileHover={{ scale: 1.02 }}
								onClick={() => setSelectedFeature(feature.id)}
								className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
									selectedFeature === feature.id
										? 'bg-gradient-to-r ' + feature.color + ' text-white shadow-lg'
										: 'bg-white/60 backdrop-blur-sm border border-white/20 hover:shadow-lg'
								}`}
							>
								<div className='flex items-center space-x-3 mb-3'>
									<feature.icon size={24} />
									<h3 className='font-bold text-lg'>{feature.title}</h3>
								</div>
								<p className={`text-sm ${selectedFeature === feature.id ? 'text-white/90' : 'text-gray-600'}`}>{feature.description}</p>
							</motion.div>
						))}
					</div>

					{/* Content Area */}
					<div className='lg:col-span-3'>
						<div className='bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20 min-h-[600px]'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6'>{features.find((f) => f.id === selectedFeature)?.title}</h2>
							{renderContent()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExtraFeatures;
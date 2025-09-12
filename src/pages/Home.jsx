import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Headphones, Award, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { currentLanguage, translations } = useLanguage();
  const t = translations[currentLanguage];

  const features = [
    {
      icon: BookOpen,
      title: t.wordLearning,
      description: currentLanguage === 'az' ? 'İnteraktiv kartlarla yeni sözlər öyrənin' : 'Learn new words with interactive cards',
      path: '/word-learning',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Headphones,
      title: t.storyListening,
      description: currentLanguage === 'az' ? 'Maraqlı hekayələrlə dinləmə qabiliyyətinizi inkişaf etdirin' : 'Improve listening skills with engaging stories',
      path: '/story-listening',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '500+', label: currentLanguage === 'az' ? 'Söz' : 'Words' },
    { number: '50+', label: currentLanguage === 'az' ? 'Hekayə' : 'Stories' },
    { number: '10K+', label: currentLanguage === 'az' ? 'Öyrənən' : 'Learners' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentLanguage === 'az' ? 'İngilis Dilini' : 'Master English'}
            </span>
            <br />
            <span className="text-gray-800">
              {currentLanguage === 'az' ? 'Öyrənin' : 'Language'}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {currentLanguage === 'az' 
              ? 'İnteraktiv kartlar və maraqlı hekayələrlə İngilis dilini asanlıqla öyrənin. Hər səviyyə üçün uyğun materiallar.'
              : 'Learn English effortlessly with interactive cards and engaging stories. Suitable materials for every level.'
            }
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 md:space-x-16 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {currentLanguage === 'az' ? 'İndi Başlayın!' : 'Start Learning Now!'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {currentLanguage === 'az' 
                ? 'Minglərlə insan bizim platformamızda İngilis dilini öyrənir.'
                : 'Join thousands of people learning English on our platform.'
              }
            </p>
            <Link
              to="/word-learning"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {currentLanguage === 'az' ? 'Öyrənməyə Başla' : 'Start Learning'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
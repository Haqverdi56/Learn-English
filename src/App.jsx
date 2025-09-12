import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import WordLearning from './pages/WordLearning';
import StoryListening from './pages/StoryListening';
import StoryDetail from './pages/StoryDetail';
import Dictionary from './pages/Dictionary';
import ExtraFeatures from './pages/ExtraFeatures';
import Teachers from './pages/Teacher';
import TeacherProfile from './pages/TeacherProfile';
import Subscription from './pages/Subscription';
import { LanguageProvider } from './contexts/LanguageContext';
import { VocabularyProvider } from './contexts/VocabularyContext';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

function App() {
	return (
		<AuthProvider>
			<SubscriptionProvider>
				<LanguageProvider>
					<VocabularyProvider>
						<Router>
							<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
								<Navigation />
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/word-learning' element={<WordLearning />} />
									<Route path='/story-listening' element={<StoryListening />} />
									<Route path='/story/:id' element={<StoryDetail />} />
									<Route path='/dictionary' element={<Dictionary />} />
									<Route path='/extra-features' element={<ExtraFeatures />} />
									<Route path='/teachers' element={<Teachers />} />
									<Route path='/teacher/:id' element={<TeacherProfile />} />
									<Route path='/subscription' element={<Subscription />} />
								</Routes>
							</div>
						</Router>
					</VocabularyProvider>
				</LanguageProvider>
			</SubscriptionProvider>
		</AuthProvider>
	);
}

export default App;

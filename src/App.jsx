import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import WordLearning from './pages/WordLearning';
import StoryListening from './pages/StoryListening';
import StoryDetail from './pages/StoryDetail';
import Dictionary from './pages/Dictionary';
import ExtraFeatures from './pages/ExtraFeatures';
import Teachers from './pages/Teachers';
import TeacherProfile from './pages/TeacherProfile';
import Subscription from './pages/Subscription';
import DailyWords from './pages/DailyWords';
import Skills from './pages/Skills';
import Grammar from './pages/Grammar';
import { Provider } from 'react-redux';
import { store } from './store';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
					<Navigation />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/word-learning' element={<WordLearning />} />
						<Route path='/story-listening' element={<StoryListening />} />
						<Route path='/story/:id' element={<StoryDetail />} />
						<Route path='/dictionary' element={<Dictionary />} />
						<Route path='/skills' element={<Skills />} />
						<Route path='/grammar' element={<Grammar />} />
						<Route path='/extra-features' element={<ExtraFeatures />} />
						<Route path='/teachers' element={<Teachers />} />
						<Route path='/teacher/:id' element={<TeacherProfile />} />
						<Route path='/subscription' element={<Subscription />} />
						<Route path='/daily-words' element={<DailyWords />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;

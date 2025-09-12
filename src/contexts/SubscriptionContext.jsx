import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
	const [subscription, setSubscription] = useState(() => {
		const saved = localStorage.getItem('subscription');
		return saved ? JSON.parse(saved) : { isPremium: false, expiresAt: null };
	});

	const [restrictedPages] = useState(['/dictionary', '/extra-features']);

	useEffect(() => {
		localStorage.setItem('subscription', JSON.stringify(subscription));
	}, [subscription]);

	const subscribe = () => {
		const expiresAt = new Date();
		expiresAt.setMonth(expiresAt.getMonth() + 1);

		setSubscription({
			isPremium: true,
			expiresAt: expiresAt.toISOString(),
		});
	};

	const isPageRestricted = (path) => {
		return restrictedPages.includes(path);
	};

	const canAccessPage = (path) => {
		if (!isPageRestricted(path)) return true;
		if (!subscription.isPremium) return false;

		const now = new Date();
		const expires = new Date(subscription.expiresAt);
		return now < expires;
	};

	return (
		<SubscriptionContext.Provider
			value={{
				subscription,
				subscribe,
				isPageRestricted,
				canAccessPage,
				restrictedPages,
			}}
		>
			{children}
		</SubscriptionContext.Provider>
	);
};

export const useSubscription = () => {
	const context = useContext(SubscriptionContext);
	if (!context) {
		throw new Error('useSubscription must be used within a SubscriptionProvider');
	}
	return context;
};

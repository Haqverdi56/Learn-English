import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	subscription: JSON.parse(localStorage.getItem('subscription')) || {
		isPremium: false,
		isLifetime: false,
		type: null, // 'monthly' | 'lifetime'
		expiresAt: null,
	},
	premiumLevels: ['B1', 'B2', 'C1', 'C2'],
	loadMoreCounts: JSON.parse(localStorage.getItem('loadMoreCounts')) || {},
};

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		subscribe: (state, action) => {
			const { type } = action.payload;

			if (type === 'monthly') {
				const expiresAt = new Date();
				expiresAt.setMonth(expiresAt.getMonth() + 1);
				state.subscription = {
					isPremium: true,
					isLifetime: false,
					type: 'monthly',
					expiresAt: expiresAt.toISOString(),
				};
			} else if (type === 'lifetime') {
				state.subscription = {
					isPremium: true,
					isLifetime: true,
					type: 'lifetime',
					expiresAt: null,
				};
			}

			localStorage.setItem('subscription', JSON.stringify(state.subscription));
		},
		incrementLoadMoreCount: (state, action) => {
			const { page } = action.payload;
			state.loadMoreCounts[page] = (state.loadMoreCounts[page] || 0) + 1;
			localStorage.setItem('loadMoreCounts', JSON.stringify(state.loadMoreCounts));
		},
		resetLoadMoreCount: (state, action) => {
			const { page } = action.payload;
			state.loadMoreCounts[page] = 0;
			localStorage.setItem('loadMoreCounts', JSON.stringify(state.loadMoreCounts));
		},
	},
});

export const { subscribe, incrementLoadMoreCount, resetLoadMoreCount } = subscriptionSlice.actions;

// Selectors
export const selectIsLevelPremium = (state, level) => {
	return state.subscription.premiumLevels.includes(level);
};

export const selectCanAccessLevel = (state, level) => {
	if (!state.subscription.premiumLevels.includes(level)) return true;
	if (!state.subscription.subscription.isPremium) return false;

	if (state.subscription.subscription.type === 'lifetime') return true;

	if (!state.subscription.subscription.expiresAt) return false;
	const now = new Date();
	const expires = new Date(state.subscription.subscription.expiresAt);
	return now < expires;
};

export const selectHasPremiumAccess = (state) => {
	if (!state.subscription.subscription.isPremium) return false;
	
	if (state.subscription.subscription.type === 'lifetime') return true;
	
	if (!state.subscription.subscription.expiresAt) return false;
	const now = new Date();
	const expires = new Date(state.subscription.subscription.expiresAt);
	return now < expires;
};

export const selectCanLoadMore = (state, page) => {
	if (state.subscription.subscription.isPremium) return true;
	return (state.subscription.loadMoreCounts[page] || 0) < 3;
};


export default subscriptionSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	subscription: JSON.parse(localStorage.getItem('subscription')) || {
		isPremium: false,
		type: null, // 'monthly' | 'lifetime'
		expiresAt: null,
	},
	restrictedPages: ['/dictionary', '/extra-features', '/grammar', '/skills'],
	loadMoreCounts: JSON.parse(localStorage.getItem('loadMoreCounts')) || {},
};

const subscriptionSlice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		subscribe: (state, action) => {
			const { type } = action.payload;
			const now = new Date();

			if (type === 'monthly') {
				const expiresAt = new Date();
				expiresAt.setMonth(expiresAt.getMonth() + 1);
				state.subscription = {
					isPremium: true,
					type: 'monthly',
					expiresAt: expiresAt.toISOString(),
				};
			} else if (type === 'lifetime') {
				state.subscription = {
					isPremium: true,
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
export const selectIsPageRestricted = (state, path) => {
	return state.subscription.restrictedPages.includes(path);
};

export const selectCanAccessPage = (state, path) => {
	if (!state.subscription.restrictedPages.includes(path)) return true;
	if (!state.subscription.subscription.isPremium) return false;

	if (state.subscription.subscription.type === 'lifetime') return true;

	const now = new Date();
	const expires = new Date(state.subscription.subscription.expiresAt);
	return now < expires;
};

export const selectCanLoadMore = (state, page) => {
	if (state.subscription.subscription.isPremium) return true;
	return (state.subscription.loadMoreCounts[page] || 0) < 3;
};

export const selectCanAccessLevel = (state, level) => {
	if (state.subscription.subscription.isPremium) return true;
	return ['A1', 'A2'].includes(level);
};

export default subscriptionSlice.reducer;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data imports
import { wordsData, generateMoreWords } from '../../data/words';
import { storiesData } from '../../data/stories';
import { getAllDictionaryWords } from '../../data/dictionary';
import { grammarData } from '../../data/grammar';
import { skillsData } from '../../data/skills';
import { teachersData } from '../../data/teachers';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api',
		// Mock implementation - replace with real API later
		fetchFn: async (url, options) => {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Mock API responses
			const mockResponses = {
				'/api/words': { data: [...wordsData, ...generateMoreWords(50)] },
				'/api/stories': { data: storiesData },
				'/api/dictionary': { data: getAllDictionaryWords() },
				'/api/grammar': { data: grammarData },
				'/api/skills': { data: skillsData },
				'/api/teachers': { data: teachersData },
			};

			const response = mockResponses[url] || { data: [] };
			return {
				ok: true,
				status: 200,
				json: async () => response,
			};
		},
	}),
	tagTypes: ['Word', 'Story', 'Dictionary', 'Grammar', 'Skill', 'Teacher'],
	endpoints: (builder) => ({
		getWords: builder.query({
			query: (params = {}) => ({
				url: '/words',
				params,
			}),
			providesTags: ['Word'],
		}),
		getStories: builder.query({
			query: (params = {}) => ({
				url: '/stories',
				params,
			}),
			providesTags: ['Story'],
		}),
		getDictionaryWords: builder.query({
			query: (params = {}) => ({
				url: '/dictionary',
				params,
			}),
			providesTags: ['Dictionary'],
		}),
		getGrammar: builder.query({
			query: (params = {}) => ({
				url: '/grammar',
				params,
			}),
			providesTags: ['Grammar'],
		}),
		getSkills: builder.query({
			query: (params = {}) => ({
				url: '/skills',
				params,
			}),
			providesTags: ['Skill'],
		}),
		getTeachers: builder.query({
			query: (params = {}) => ({
				url: '/teachers',
				params,
			}),
			providesTags: ['Teacher'],
		}),
	}),
});

export const { useGetWordsQuery, useGetStoriesQuery, useGetDictionaryWordsQuery, useGetGrammarQuery, useGetSkillsQuery, useGetTeachersQuery } =
	apiSlice;

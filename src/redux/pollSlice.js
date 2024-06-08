import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllPolls } from './utils/callAPI';
import { ANSWER_OPTION } from '../constants/constant';
import { checkIfAnswered } from './utils/common';
import { _saveQuestion, _saveQuestionAnswer } from '../_DATA';

const initialState = {
	loading: false,
	polls: [],
};

/**
 * @description Get all polls
 */
export const fetchPolls = createAsyncThunk('polls/getAllPolls', async () => await getAllPolls());

export const handleSubmitAnswer = createAsyncThunk(
	'polls/handleSubmitAnswer',
	async ({ authedUser, qid, answer }) => {
		await _saveQuestionAnswer({ authedUser, qid, answer });

		return { authedUser, qid, answer };
	},
);

/**
 * @description Create new poll
 */
export const handleCreateQuestion = createAsyncThunk(
	'polls/handleCreateQuestion',
	async ({ author, optionOneText, optionTwoText }) => {
		const result = await _saveQuestion({ author, optionOneText, optionTwoText });

		return result;
	},
);

const pollSlice = createSlice({
	name: 'polls',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPolls.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchPolls.fulfilled, (state, action) => {
			state.polls = action.payload;
			state.loading = false;
		});
		builder.addCase(handleSubmitAnswer.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(handleSubmitAnswer.fulfilled, (state, action) => {
			let currentVoters = state.polls[action.payload.qid][action.payload.answer].votes;
			if (
				!checkIfAnswered(state.polls[action.payload.qid], action.payload.authedUser) &&
				(action.payload.answer === ANSWER_OPTION.OPTION_ONE ||
					action.payload.answer === ANSWER_OPTION.OPTION_TWO)
			) {
				currentVoters.push(action.payload.authedUser);
			}
			state.loading = false;
		});
		builder.addCase(handleCreateQuestion.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(handleCreateQuestion.fulfilled, (state, action) => {
			state.loading = false;
			state.polls[action.payload.id] = action.payload;
		});
		builder.addCase(handleCreateQuestion.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export default pollSlice.reducer;

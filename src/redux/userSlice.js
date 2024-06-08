import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './utils/callAPI';
import { handleCreateQuestion, handleSubmitAnswer } from './pollSlice';

const initialState = {
    loading: false,
    users: [],
};

export const fetchUsers = createAsyncThunk('users/getAllUsers', async () => await getAllUsers());

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(handleSubmitAnswer.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleSubmitAnswer.fulfilled, (state, action) => {
            state.users[action.payload.authedUser].answers[action.payload.qid] = action.payload.answer;
            state.loading = false;
        });
        builder.addCase(handleCreateQuestion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(handleCreateQuestion.fulfilled, (state, action) => {
            state.loading = false;
            state.users[action.payload.author].questions.push(action.payload.id);
        });
        builder.addCase(handleCreateQuestion.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export default userSlice.reducer;

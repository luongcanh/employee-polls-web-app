/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Dashboard from '../views/pages/Dashboard';
import { store } from '../redux/store';
import { setLogin } from '../redux/loginSlice';
import { fetchUsers } from '../redux/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import { Leaderboard } from '@mui/icons-material';

describe('Leaderboard Component', () => {
	let component;

	beforeEach(async () => {
		await store.dispatch(fetchUsers());
		await store.dispatch(setLogin({ id: 'sarahedo' }));
		// eslint-disable-next-line
		component = render(
			<Provider store={store}>
				<Router>
					<Leaderboard />
				</Router>
			</Provider>,
		);
	});

	it('renders Leaderboard component correctly', () => {
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
	});

});

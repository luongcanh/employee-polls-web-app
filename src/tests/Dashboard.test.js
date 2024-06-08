/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Dashboard from '../views/pages/Dashboard';
import { store } from '../redux/store';
import { setLogin } from '../redux/loginSlice';
import { fetchPolls } from '../redux/pollSlice';
import { fetchUsers } from '../redux/userSlice';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard Component', () => {
	let component;

	beforeEach(async () => {
		await store.dispatch(fetchPolls());
		await store.dispatch(fetchUsers());
		await store.dispatch(setLogin({ id: 'sarahedo' }));
		// eslint-disable-next-line
		component = render(
			<Provider store={store}>
				<Router>
					<Dashboard />
				</Router>
			</Provider>,
		);
	});

	it('renders all tabs correctly', () => {
        expect(component).toMatchSnapshot();
	});

	it('renders New Question tab content correctly', () => {
		const { getByText, queryAllByText } = component;
		fireEvent.click(getByText('New Question'));
		const noNewQuestions =
			Object.keys(store.getState().polls.polls).length -
			Object.keys(store.getState().users.users['sarahedo'].answers).length;
		expect(queryAllByText('Show').length).toEqual(noNewQuestions);
	});

	it('renders Done tab content correctly', () => {
		const { getByText, queryAllByText } = component;
		fireEvent.click(getByText('Done'));
		const noAnswerQuestions = Object.keys(store.getState().users.users['sarahedo'].answers).length;
		expect(queryAllByText('Show').length).toEqual(noAnswerQuestions);
	});
});

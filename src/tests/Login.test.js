/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../views/pages/Login';
import { store } from '../redux/store';


describe('Login Component', () => {
	let component;

	beforeEach(() => {

		// eslint-disable-next-line
		component = render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>,
		);
	});

	it('render the login component correctly', () => {
		const { getByTestId } = component;

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
		expect(getByTestId('submit-btn')).toBeInTheDocument();
		expect(getByTestId('username')).toBeInTheDocument();
		expect(getByTestId('password')).toBeInTheDocument();
	});

	it('completes the form submission using correct credentials', async () => {
		const { getByTestId } = component;

		fireEvent.change(getByTestId('username').querySelector('input'), { target: { value: 'sarahedo' }, });
		fireEvent.change(getByTestId('password').querySelector('input'), { target: { value: 'password123' }, });
		fireEvent.click(getByTestId('submit-btn'));

		await waitFor(() => expect(store.getState().login.authedUser) === 'sarahedo');
	});
});

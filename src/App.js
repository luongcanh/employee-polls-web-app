import React, { useEffect } from 'react';
import './App.css';
import Login from './views/pages/Login';
import Poll from './views/pages/Poll';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './views/pages/Dashboard';
import Leaderboard from './views/pages/Leaderboard';
import NewPoll from './views/pages/NewPoll';
import Appl from './views/pages/Appl';
import { useDispatch } from 'react-redux';
import { fetchPolls } from './redux/pollSlice';
import { fetchUsers } from './redux/userSlice';
import ErrorPage from './views/pages/ErrorPage';

function App() {
	const dispatch = useDispatch();

	/**
	 * @description Retrieve all polls and users
	 */
	useEffect(() => {
		dispatch(fetchPolls());
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Appl />}>
						<Route index element={<Dashboard />} />
						<Route path="/" element={<Dashboard />} />
						<Route path="leaderboard" element={<Leaderboard />} />
						<Route path="add" element={<NewPoll />} />
						<Route path="questions/:id" element={<Poll />} />
						<Route path="/404" element={<ErrorPage />} />
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

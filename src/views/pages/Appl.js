import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import { useSelector } from 'react-redux';
import { selectLogin } from '../../redux/loginSlice';

const Appl = () => {
	const location = useLocation();
	const authedUser = useSelector(selectLogin);
	const navigate = useNavigate();

	useEffect(() => {
		if (!authedUser) {
			navigate('/login', { state: { prevUrl: location.pathname } });
		}
	}, [authedUser, location.pathname, navigate]);

	return (
		<div>
			<HeaderBar />
			<Outlet />
		</div>
	);
};

export default Appl;

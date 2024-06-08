import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice';

export const Users = () => {
	const dispatch = useDispatch();
	dispatch(fetchUsers());

	return <div>Users</div>;
};

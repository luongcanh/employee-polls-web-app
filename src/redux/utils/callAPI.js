import { _getUsers, _getQuestions } from '../../_DATA';

export const checkLogin = async (username, password) => {
	const users = await _getUsers();
	if (users[username] && users[username].password) {
		return true;
	}

	return false;
};

export const getAllPolls = async () => await _getQuestions();

export const getAllUsers = async () => await _getUsers()
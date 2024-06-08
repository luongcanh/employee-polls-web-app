import { ANSWER_OPTION } from '../../constants/constant';

/**
 * @description  check whether a question has been answered or not
 */
export const checkIfAnswered = (question, authedUser) => {
	const optionOneVoters = question[ANSWER_OPTION.OPTION_ONE].votes;
	const optionTwoVoters = question[ANSWER_OPTION.OPTION_TWO].votes;

	return optionOneVoters.includes(authedUser) || optionTwoVoters.includes(authedUser);
};

/**
 * @description Format datetime HH:mm | dd-MM-yyyy
 */
export const formatTime = (date) => {
	const padZero = (num) => (num < 10 ? '0' + num : num);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	const day = padZero(date.getDate());
	const month = padZero(date.getMonth() + 1);
	const year = date.getFullYear();

	return `${hours}:${minutes} | ${day}-${month}-${year}`;
};

import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Container } from '@mui/material';
import QuestionsList from '../components/QuestionsList';
import { useSelector } from 'react-redux';
import { ANSWER_TYPE } from '../../constants/constant';

const Dashboard = () => {
	const [value, setValue] = useState(0);
	const authedUser = useSelector((state) => state.login.authedUser);
	const [newQuestions, setNewQuestions] = useState({});
	const [answeredQuestions, setAnsweredQuestions] = useState({});
	const allQuestions = useSelector((state) => state.polls.polls);
	const users = useSelector((state) => state.users.users);

	useEffect(() => {
		if (authedUser) {

			const answeredQuestionIds = Object.keys(users[authedUser].answers).sort(
				(firstQId, secondQId) => {
					return allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp;
				},
			);

			const newQuestionIds = Object.keys(allQuestions)
				.filter((questionId) => !users[authedUser].answers[questionId])
				.sort((firstQId, secondQId) => {
					return allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp;
				});
			
			setNewQuestions(
				newQuestionIds.reduce((acc, questionId) => {
					return { ...acc, [questionId]: allQuestions[questionId] };
				}, {}),
			);
			
			setAnsweredQuestions(
				answeredQuestionIds.reduce((acc, questionId) => {
					return { ...acc, [questionId]: allQuestions[questionId] };
				}, {}),
			);
		}
		// eslint-disable-next-line
	}, []);

	/**
	 * @description Handle tab selection changes (New Question/ Done)
	 */
	const handleOnChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Container maxWidth="xl">
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleOnChange}>
							<Tab label="New Question" />
							<Tab label="Done" />
						</Tabs>
					</Box>
					{value === 0 && (
                        <QuestionsList questions={newQuestions} questionType={ANSWER_TYPE.UNANSWERED} />
                    )}
                    {value === 1 && (
                        <QuestionsList questions={answeredQuestions} questionType={ANSWER_TYPE.ANSWERED} />
                    )}
				</Box>
			</Container>
		</div>
	);
};

export default Dashboard;

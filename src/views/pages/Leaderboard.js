import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	Avatar,
	Grid,
	Typography
} from '@mui/material';
import { useSelector } from 'react-redux';

const headers = [
    { key: 'Users', value: 'Users' },
    { key: 'Answers', value: 'Answers' },
    { key: 'Created', value: 'Created' }
];

const Leaderboard = () =>{
	const users = useSelector((state) => state.users.users);

	const leaderBoard = Object.keys(users)
		.map((userId) => ({
			...users[userId],
			noAnswers: Object.keys(users[userId].answers).length,
			noQuestions: users[userId].questions.length,
		}))
		.sort(({ noQuestions: noQuestionsA }, { noQuestions: noQuestionsB }) => noQuestionsB - noQuestionsA)
		.sort(({ noAnswers: noAnswerA }, { noAnswers: noAnswerB }) => noAnswerB - noAnswerA);

	return (
		<Container>
			<TableContainer component={Paper} elevation={4} sx={{ mt: 5 }}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: 'grey.400' }}>
							{headers.map((header, index) => (
								<TableCell key={index} sx={{ fontWeight: 'bold' }}>{header.value}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{leaderBoard.map((user) => (
							<TableRow key={user.name}>
								<TableCell component="th" scope="row">
									<Grid container spacing={2}>
										<Grid item>
											<Avatar alt="Remy Sharp" src={user.avatarURL} />
										</Grid>
										<Grid item>
											<Grid container flexDirection='column' >
												<Grid item>
													<Typography variant="body1" color="initial">{user.name}</Typography>
												</Grid>
												<Grid item>
													<Typography variant="caption" color="grey">{user.id}</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</TableCell>
								<TableCell>{user.noAnswers}</TableCell>
								<TableCell>{user.noQuestions}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

 export default Leaderboard;
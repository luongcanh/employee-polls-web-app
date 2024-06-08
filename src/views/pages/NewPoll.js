import { Alert, Box, Container, Snackbar, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCreateQuestion } from '../../redux/pollSlice';
import { selectLogin } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';

const NewPoll = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [firstOption, setFirstOption] = useState('');
	const [secondOption, setSecondOption] = useState('');
	const [error, setError] = useState(null);
	const [showError, setShowError] = React.useState(false);

	const authedUser = useSelector(selectLogin);

	const handleCreateNewPoll = async (e) => {
		e.preventDefault();

		try {
			await dispatch(
				handleCreateQuestion({
					author: authedUser,
					optionOneText: firstOption,
					optionTwoText: secondOption,
				}),
			).unwrap();
			navigate('/');
		} catch (error) {
			setShowError(true);
			setError(error);
		}
	};

	/**
	 * @description Close the error message
	 */
	const handleCloseAlert = () => {
		setShowError(false);
		setError(null);
	}

	return (
		<Container sx={{ p: 5 }}>
			<Typography variant="h3" color="initial">
				Would You Rather
			</Typography>
			<Typography variant="h5" color="grey">
				Create your own poll
			</Typography>
			<Box component="form" sx={{ mt: 3, width: '100%' }} noValidate onSubmit={handleCreateNewPoll}>
				<TextField
					sx={{ width: '100%', my: 2 }}
					value={firstOption}
					onChange={(e) => {
						setFirstOption(e.target.value);
					}}
					label="First Option"
				/>
				<TextField
					sx={{ width: '100%', my: 2 }}
					value={secondOption}
					onChange={(e) => {
						setSecondOption(e.target.value);
					}}
					label="Second Option"
				/>
				<Button type="submit" variant="contained" startIcon={<SaveIcon />}>
					Submit
				</Button>
				<Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={showError} onClose={handleCloseAlert}>
					<Alert severity="error">{error?.message}</Alert>
				</Snackbar>
			</Box>
		</Container>
	);
};

export default NewPoll;

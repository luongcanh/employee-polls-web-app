import { useDispatch } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';

import * as React from 'react';
import {
	CssBaseline,
	TextField,
	Box,
	Grid,
	Typography,
	Snackbar,
	createTheme,
	ThemeProvider,
	Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogin } from '../../redux/loginSlice';
import { checkLogin } from '../../redux/utils/callAPI';
import { LoadingButton } from '@mui/lab';

const defaultTheme = createTheme();

const Login = () => {
	const location = useLocation();
	const [showError, setShowError] = React.useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	/**
	 * @description Handle the "Sign In" button click event
	 */
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const usernameVal = data.get('username');
		const passwordVal = data.get('password');
		checkLogin(usernameVal, passwordVal).then((result) => {
			if (result) {
				dispatch(setLogin({ id: usernameVal }));
				navigate(location?.state?.prevUrl ? location?.state?.prevUrl : '/');
			} else {
				setShowError(true);
			}
		});
	};

	/**
 	* @description Close the error message
 	*/
	const handleCloseAlert = () => {
		setShowError(false)
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Box sx={{ my: 8, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', }} >
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus data-testid='username' />
						<TextField margin="normal" required fullWidth name="password" label="Password" type="password" data-testid='password' />
						<LoadingButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} data-testid='submit-btn' startIcon={<LoginIcon />}>
							Sign In
						</LoadingButton>
						<Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showError} onClose={handleCloseAlert} data-testid='error-snackbar'>
							<Alert severity="error">The username or password is incorrect. Please try again!</Alert>
						</Snackbar>
					</Box>
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

export default Login;

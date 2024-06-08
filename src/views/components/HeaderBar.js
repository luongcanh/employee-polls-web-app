import {
	Box,
	Tabs,
	Tab,
	AppBar,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Typography,
	Container,
	Toolbar,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../../redux/loginSlice';

const routes = ['/', '/leaderboard', '/add'];
const labels = ['Home', 'Leaderboard', 'New'];
const tabs = routes.map((route, index) => ({
	key: route,
	label: labels[index],
	value: route
}));

const settings = ['Logout'];

const HeaderBar = () => {
	const dispatch = useDispatch();
	const authedUser = useSelector((state) => state.login.authedUser);
	const users = useSelector((state) => state.users.users);

	const [value, setValue] = React.useState('/');
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	/**
	 * @description Handle the "Avatar" click event
	 */
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	/**
	 * @description Handle closing the logout menu
	 */
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	/**
	 * @description Handle tab selection changes (Home/ Leaderboard/ New)
	 */
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	/**
	 * @description Handle the "Logout" click event
	 */
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(setLogout());
	};

	useEffect(() => {
		routes.includes(window.location.pathname) ? setValue(window.location.pathname) : setValue(false);
	}, []);

	return (
		<div>
			<AppBar position="static" color="transparent">
				<Container maxWidth="">
					<Toolbar disableGutters>
						<Box sx={{ width: '100%' }}>
							<Tabs value={value} onChange={handleChange} aria-label="nav tabs example" role="navigation" >
								{tabs.map(tab => (
									<Tab key={tab.key} label={tab.label} value={tab.value} component={Link} to={tab.value} />
								))}
							</Tabs>
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src={users[authedUser]?.avatarURL} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
								keepMounted
								transformOrigin={{ vertical: 'top', horizontal: 'right', }}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleLogout}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography marginLeft="5px" component="p">
							{authedUser}
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default HeaderBar;

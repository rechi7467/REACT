
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserNameAvatar } from './UserNameAvatar';
import Login from './Login';
const pages = [{ name: 'Recipes', path: '/recipes' }, { name: 'Home-Page', path: '/' }];
function MyAppBar() {
    const navigate = useNavigate();
    const [state] = React.useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [openLogin, setOpenLogin] = React.useState(false);
    const [loginStatus, setLoginStatus] = React.useState('');
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
    const handleCloseNavMenu = () => { setAnchorElNav(null); };
    const handleLoginClick = (LR: string) => { setLoginStatus(LR); setOpenLogin(true); console.log(LR); };
    return (
        <AppBar position="static" sx={{ bgcolor: 'pink' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {state.password !== '' && (
                        <Box sx={{ flexGrow: 0, mr: 2 }}>
                            <UserNameAvatar />
                        </Box>)}
                    {state.email == '' && (
                        <Box sx={{ flexGrow: 0, mr: 2 }}>
                            <Button style={{
                                marginTop: '7px', width: '70px', height: '40px', backgroundColor: 'deeppink', color: 'pink',
                                border: 'white', boxShadow: '2px 2px 2px rgba(5, 5, 5, 3)', fontSize: '15px',
                            }} onClick={() => handleLoginClick('login')}>Login</Button>
                            <Button style={{
                                marginLeft: '10px', marginTop: '7px', width: '85px', height: '40px', backgroundColor: 'deeppink', color: 'pink',
                                border: 'white', boxShadow: '2px 2px 2px rgba(5, 5, 5, 3)', fontSize: '15px',
                            }} onClick={() => handleLoginClick('register')}>Register</Button>
                        </Box>)}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
                            color: 'pink', textDecoration: 'none',
                        }}>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => { handleCloseNavMenu(); navigate(page.path); }}
                                sx={{ my: 2, color: 'pink', display: 'block', fontWeight: 'bold', bgcolor: 'deeppink', margin: '10px' }} >
                                {page.name}
                            </Button>))}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            {openLogin && (<Login status={loginStatus} setOpenLogin={setOpenLogin} />)}
        </AppBar>
    );
}
export default MyAppBar;
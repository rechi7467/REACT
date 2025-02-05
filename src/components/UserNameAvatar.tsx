import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';
import { UpdateUser } from './UpdateUser';
import { Button, Modal} from '@mui/material';
import { useState } from 'react';
import AddRecipe from './AddRecipe';

export const UserNameAvatar = () => {

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [state] = React.useContext(UserContext);
    const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

return(
    <>
    <Box sx={{ flexGrow: 0 ,display: 'flex', alignItems: 'center'}}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  alt={state.firstName} src="/static/images/avatar/2.jpg" 
                sx={{ width: 56, height: 56, bgcolor: 'deeppink' ,position:'flex'}}/>
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
            ))}
        </Menu> 
       <UpdateUser />
                <><Button style={{
                    marginTop: '3px',
                    marginLeft:'10px',
                    width: '80px',
                    height: '45px',
                    backgroundColor: 'deeppink', 
                    color: 'pink',
                    border: 'white', 
                    boxShadow: '2px 2px 2px rgba(5, 5, 5, 5)',
                    fontSize: '15px',
                }} onClick={() => setIsAddRecipeModalOpen(true)}>
                Add Recipe
            </Button>
            <Modal open={isAddRecipeModalOpen} onClose={() => setIsAddRecipeModalOpen(false)}>
                    <Box sx={style}>
                        <AddRecipe />
                        <Button style={{
                    marginTop: '3px', width: '80px',height: '45px',backgroundColor: 'deeppink',color: 'pink',border: 'white',
                    boxShadow: '2px 2px 2px rgba(5, 5, 5, 5)',fontSize: '15px',                                                                                                                        
                }} onClick={() => setIsAddRecipeModalOpen(false)}>Close</Button>
                    </Box>
                </Modal></>
     </Box>
    </>
    )
}
import { useReducer } from 'react';
import { UserContext, UserReducer, initialUserState } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import MyAppBar from './components/AppBar';
import AppRoutes from './router'; 

const App = () => {
    const [state, dispatch] = useReducer(UserReducer, initialUserState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            <Router>
                <MyAppBar />
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" padding="20px">
                    <AppRoutes /> {/* השתמש בקומפוננטה החדשה */}
                </Box>
            </Router>
        </UserContext.Provider>
    );
};

export default App;

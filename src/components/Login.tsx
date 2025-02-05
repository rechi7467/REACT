

import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";

interface LoginProps {
    status: string;
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ status, setOpenLogin }) => {

    const url = "http://localhost:3000/api/user/";
    const [, dispatch] = useContext(UserContext);
    const [IsOpenModal, setIsOpenModal] = useState(true)



    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

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
    const handleCancel = () => {
        setOpenLogin(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + status, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            console.log('response', response);
            if (status === 'register') {
                dispatch({
                    type: 'CREATE',
                    data: {
                        firstName: '',
                        lastName: '',
                        address: '',
                        phone: '',
                        id: response.data.userId,
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value
                    }
                });
            } else if (status === 'login') {
                dispatch({
                    type: 'CREATE',
                    data: response.data.user
                });
            }
            setIsOpenModal(false);


        } catch (err: any) {
            console.error('Error:', err);
            if (err.response) {
                alert(`Error: ${err.response.data.message}`);
            } else if (err.request) {
                alert('Error: No response from server');
            } else {
                alert(`Error: ${err.message}`);
            }
        }
    };
    console.log(IsOpenModal)
    return (
        <>

            <Modal open={IsOpenModal}>

                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='Email' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} />
                        <TextField label='Password' type='password' variant="filled" margin="normal" fullWidth inputRef={passwordRef} />
                        <Button sx={{ marginTop: '2px', backgroundColor: 'pink', color: 'deeppink', border: 'white' }}
                            color="info" fullWidth variant="contained" type="submit">Save</Button>
                        <Button sx={{ marginTop: '2px', backgroundColor: 'pink', color: 'deeppink', border: 'white' }} color="info" fullWidth variant="contained" onClick={handleCancel}>Cancel</Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Login;
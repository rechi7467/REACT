import { Modal, Box, TextField, Button } from "@mui/material"
import axios from "axios";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import AddRecipe from "./AddRecipe";

export const UpdateUser = () => {
    const [state, dispatch] = useContext(UserContext);
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const PhoneRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [isOpenModal, setIsOpenModal] = useState(false);
    const url = "http://localhost:3000/api/user"
    
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


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(url, {
                firstName: firstNameRef.current?.value,
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value,
                phone: PhoneRef.current?.value

            },
                { headers: { 'user-id': state.id } });

            console.log('response', response);
            dispatch({
                type: 'UPDATE_USER',
                data: {
                    id: state.id,
                    email: emailRef.current?.value,
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    address: addressRef.current?.value,
                    phone: PhoneRef.current?.value
                }
            })

            setIsOpenModal(false);

        } catch (err: any) {
            console.error(err);

        }
    }
    return (
        <>
            <Button style={{
                marginTop: '3px',
                marginLeft:'20px',
                width: '70px',
                height: '45px',
                backgroundColor: 'deeppink',
                color: 'pink',
                border: 'white',
                boxShadow: '2px 2px 2px rgba(5, 5, 5, 3)',
                fontSize: '15px',
            }} onClick={() => { setIsOpenModal(true); }}>Update</Button>
            < Modal open={isOpenModal} >
                <Box sx={style} >
                    <form onSubmit={handleSubmit}>
                        <TextField label='FirstName' type='text' variant="filled" margin="normal" defaultValue={state.firstName} fullWidth inputRef={firstNameRef} />
                        <TextField label='LastName' type='text' variant="filled" margin="normal" defaultValue={state.lastName} fullWidth inputRef={lastNameRef} />
                        <TextField label='Email' type='email' variant="filled" margin="normal" defaultValue={state.email} fullWidth inputRef={emailRef} />
                        <TextField label='Address' type='text' variant="filled" margin="normal" defaultValue={state.address} fullWidth inputRef={addressRef} />
                        <TextField label='Phone' type='text' variant="filled" margin="normal" defaultValue={state.phone} fullWidth inputRef={PhoneRef} />
                        <Button sx={{ marginTop: '2px' }} color="info" fullWidth variant="contained" type="submit">save</Button>
                        <Button sx={{ marginTop: '2px' }} color="info" fullWidth variant="contained" onClick={() => setIsOpenModal(false)}>cancle</Button>
                    </form>
                </Box>
            </Modal>
            <Modal open={isAddRecipeModalOpen} onClose={() => setIsAddRecipeModalOpen(false)}>
                <Box sx={style}>
                    <AddRecipe />
                    <Button onClick={() => setIsAddRecipeModalOpen(false)}>Close</Button>
                </Box>
            </Modal>
        </>
    )
}
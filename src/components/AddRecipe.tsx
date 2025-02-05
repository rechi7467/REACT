
import React, { useContext } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
const AddRecipe: React.FC = () => {
    const [state] = useContext(UserContext);
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        ingredients: Yup.string().required('Ingredients are required'),
        products: Yup.string().required('Products are required'),
        instructions: Yup.string().required('Instructions are required'),
    });
    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:3000/api/recipes', {
                title: values.title, description: values.description, ingredients: values.ingredients, products: values.products, instructions: values.instructions,
            }, {
                headers: {
                    'user-id': state.id,
                },
            });
            alert(response.data.message);
        } catch (error: any) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                alert('Error: No response from server');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };
    return (
        <Formik
            initialValues={{ title: '', description: '', ingredients: '', products: '', instructions: '', }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange }) => (
                <Form>
                    <Box sx={{ mt: 2 }}>
                        <Field
                            name="title"
                            as={TextField}
                            label="Title"
                            fullWidth
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="title" />
                        </div>
                        <Field
                            name="description"
                            as={TextField}
                            label="Description"
                            fullWidth
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="description" />
                        </div>
                        <Field
                            name="products"
                            as={TextField}
                            label="Products"
                            fullWidth
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="products" />
                        </div>
                        <Field
                            name="ingredients"
                            as={TextField}
                            label="Ingredients"
                            fullWidth
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="ingredients" />
                        </div>
                        <Field
                            name="instructions"
                            as={TextField}
                            label="Instructions"
                            fullWidth
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="instructions" />
                        </div>
                        <Button style={{
                            marginTop: '3px', width: '80px', height: '45px', backgroundColor: 'deeppink', color: 'pink', border: 'white',
                            boxShadow: '2px 2px 2px rgba(5, 5, 5, 5)', fontSize: '13px',
                        }} type="submit" variant="contained" > Add Recipe </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
export default AddRecipe;
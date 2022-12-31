import * as React from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './style.css'
import { GoDiffAdded } from 'react-icons/go'
import { createForm } from '../../helper/axiosInstance'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    Typography

} from '@material-ui/core';
import { Input, Textarea, Button } from '../StyledComponent/StyledComponent';


const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    country: yup.string().required(),
    address: yup.string().required(),
    dob: yup.string().required()
}).required();


export default function DialogBox({ setUpdate }) {
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (files) => {
        try {
            const { data:
                { success,
                    message }
            } = await createForm('/create', { ...files })
            if (success) {
                setUpdate(prev => !prev)
                setOpen(false);
                reset()
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <GoDiffAdded onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>
                        <Typography>Register User</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid className='main-content' item xs={8}>

                            <Grid className='sub-content'>
                                <Box className='box-content'>
                                    <label htmlFor='name'>
                                        Name:</label>
                                    <Input
                                        type="text"
                                        name='name'
                                        placeholder='Name'
                                        {...register("name")}
                                    />
                                    <p>{errors.name?.message}</p>
                                </Box>

                                <Box className='box-content' item xs={4}>
                                    <label htmlFor='name'>
                                        Email:</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder='Email'
                                        {...register("email")}
                                    />
                                    <p>{errors.email?.message}</p>
                                </Box>
                            </Grid>

                            <Grid className='sub-content' item xs={4}>
                                <Box className='box-content'>
                                    <label htmlFor='name'>
                                        Date of Birth:</label>
                                    <Input
                                        type="date"
                                        name="dob"
                                        placeholder='Date of birth'
                                        width={'194px'}
                                        {...register("dob")}
                                    />
                                    <p>{errors.dob?.message}</p>

                                </Box>
                                <Box className='box-content'>
                                    <label htmlFor='country'>
                                        Country:</label>
                                    <Input
                                        type="text"
                                        name="country"
                                        placeholder='country'
                                        {...register("country")}
                                    />
                                    <p>{errors.country?.message}</p>

                                </Box>

                            </Grid>
                            <Grid item xs={12}>
                                <Box className='box-content'>
                                    <label htmlFor='address'>
                                        Address:</label>
                                    <Textarea
                                        name='address'
                                        type="text"
                                        placeholder='address'
                                        rows="3"
                                        {...register("address")}
                                    />
                                    <p>{errors.address?.message}</p>

                                </Box>


                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div >
    );
}




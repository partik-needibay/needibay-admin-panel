// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import React, { forwardRef, useState } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
const defaultValues = {
    dob: null,
    email: '',
    radio: '',
    select: '',
    firstName: '',
    lastName: '',
    password: '',
    address: ''
    // textarea: '',
    // checkbox: false
}


const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

function CreateForm() {
    // ** States
    const [state, setState] = useState({
        password: '',
        showPassword: false
    })

    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    const onSubmit = () => toast.success('Form Submitted')
    return (
        <Card>
            <CardHeader title='Create Customer' />
            <form onSubmit={handleSubmit(onSubmit)} style={{
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(43, 52, 69)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                boxShadow: 'rgba(3, 0, 71, 0.09) 0px 1px 3px',
                padding: "20px"
            }}>
                <Grid container spacing={5} >

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <Controller
                                name='firstName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Firstname'
                                        onChange={onChange}
                                        placeholder='Leonard'
                                        error={Boolean(errors.firstName)}
                                        aria-describedby='validation-basic-first-name'
                                        size="small"
                                    />
                                )}
                            />
                            {errors.firstName && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <Controller
                                name='lastName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='lastName'
                                        onChange={onChange}
                                        placeholder='Carter'
                                        error={Boolean(errors.lastName)}
                                        aria-describedby='validation-basic-last-name'
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <Controller
                                name='email'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        type='email'
                                        value={value}
                                        label='Email'
                                        onChange={onChange}
                                        error={Boolean(errors.email)}
                                        placeholder='carterleonard@gmail.com'
                                        aria-describedby='validation-basic-email'
                                    />
                                )}
                            />
                            {errors.email && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                                Password
                            </InputLabel>
                            <Controller
                                name='password'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <OutlinedInput
                                        value={value}
                                        label='Password'
                                        onChange={onChange}
                                        id='validation-basic-password'
                                        error={Boolean(errors.password)}
                                        type={state.showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    edge='end'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    aria-label='toggle password visibility'
                                                >
                                                    <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                )}
                            />
                            {errors.password && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name='dob'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (

                                <DatePicker
                                    selected={value}
                                    // showYearDropdown
                                    // showMonthDropdown
                                    onChange={e => onChange(e)}
                                    placeholderText='MM/DD/YYYY'
                                    customInput={
                                        <CustomInput
                                            value={value}
                                            onChange={onChange}
                                            label='Date of Birth'
                                            error={Boolean(errors.dob)}
                                            aria-describedby='validation-basic-dob'
                                        />
                                    }
                                />

                            )}
                        />
                        {errors.dob && (
                            <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                This field is required
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                                Address
                            </InputLabel>
                            <Controller
                                name='address'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <OutlinedInput
                                        value={value}
                                        label='Password'
                                        onChange={onChange}
                                        placeholder='Enter your street address...'
                                        id='validation-basic-password'
                                        error={Boolean(errors.address)}
                                    />
                                )}
                            />
                            {errors.address && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>




                    <Grid item xs={12}>
                        <Button size='large' type='submit' variant='contained'>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default CreateForm
import React, { forwardRef, useState } from 'react'
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
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
const defaultValues = {
    dob: null,
    email: '',
    radio: '',
    select: '',
    productname: '',
    Quantity: '',
    shippingAddress: '',
    // textarea: '',
    // checkbox: false
}

const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})
function CreateOrder() {
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
            <CardHeader title='Create Order' />
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
                                name='productname'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Product Name'
                                        onChange={onChange}
                                        placeholder='Product Name'
                                        error={Boolean(errors.productname)}
                                        aria-describedby='validation-basic-first-name'
                                    />
                                )}
                            />
                            {errors.productname && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Quantity
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='Quantity'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='5'>5</MenuItem>
                                        <MenuItem value='10'>10</MenuItem>
                                        <MenuItem value='20'>20</MenuItem>
                                        <MenuItem value='30'>30</MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.select && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Price per unit
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='price'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='300'>300</MenuItem>
                                        <MenuItem value='400'>400</MenuItem>
                                        <MenuItem value='500'>500</MenuItem>
                                        <MenuItem value='600'>600</MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.select && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <Controller
                                name='shippingAddress'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        type='text'
                                        value={value}
                                        label='shippingAddress'
                                        onChange={onChange}
                                        error={Boolean(errors.shippingAddress)}
                                        placeholder='Enter your Address'
                                        aria-describedby='validation-basic-email'
                                    />
                                )}
                            />
                            {errors.shippingAddress && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
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

export default CreateOrder
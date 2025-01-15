import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Icon, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, Drawer } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import AccordianIcon from 'src/@core/components/icon';
import styled from '@emotion/styled';
import { brown } from '@mui/material/colors'
import { useDropzone } from 'react-dropzone';
import Link from 'src/@core/theme/overrides/link';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Upload from "../../views/pages/contact/create-contact/upload"
import CreateProductConfig from '../product/createProductConfig';



const CreateProduct = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: brown[500],
        color: theme.palette.getContrastText(brown[500]),
        height: "40px",
        '&:hover': {
            backgroundColor: brown[700]
        }
    }))



    // ** States
    const [state, setState] = useState({
        password: '',
        showPassword: false
    })
    const defaultValues = {
        dob: null,
        email: '',
        radio: '',
        select: '',
        SKU: '',
        Quantity: '',
        textarea: '',
        ProductName: '',
        checkbox: false
    }

    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }
    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    const onSubmit = () => toast.success('Form Submitted');

    return (
        <>

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
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Attribute Set
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='AttributeSet'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>
                                        <MenuItem value='Australia'>Australia</MenuItem>
                                        <MenuItem value='Germany'>Germany</MenuItem>
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
                                name='ProductName'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='Product Name'
                                        onChange={onChange}
                                        placeholder='Leonard'
                                        error={Boolean(errors.firstName)}
                                        aria-describedby='validation-basic-first-name'
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
                                name='SKU'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField
                                        value={value}
                                        label='SKU'
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
                                name='Price'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <TextField

                                        value={value}
                                        label='Price'
                                        onChange={onChange}
                                        error={Boolean(errors.email)}
                                        placeholder='$'
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
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Tax Class
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='Tax Class'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>
                                        <MenuItem value='Australia'>Australia</MenuItem>
                                        <MenuItem value='Germany'>Germany</MenuItem>
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
                            <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                                Quantity
                            </InputLabel>
                            <Controller
                                name='Quantity'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <OutlinedInput
                                        value={value}
                                        label='Password'
                                        onChange={onChange}
                                        id='validation-basic-password'
                                        error={Boolean(errors.Quantity)}

                                    />
                                )}
                            />
                            {errors.Quantity && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
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
                                Stock Status
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='Stockstatus'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>


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
                                Visibility
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label=' Visibility'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>


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
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='validation-basic-password' error={Boolean(errors.password)}>
                                Weight
                            </InputLabel>
                            <Controller
                                name='Weight'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <OutlinedInput
                                        value={value}
                                        label='Weight'
                                        onChange={onChange}
                                        id='validation-basic-password'
                                        error={Boolean(errors.Quantity)}

                                    />
                                )}
                            />
                            {errors.Quantity && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                                    This field is required
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Visibility
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label=' Visibility'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>


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
                                Country of Manufacture
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label=' Country of Manufacture '
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>


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
                    <Grid item xs={7} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel
                                id='validation-basic-select'
                                error={Boolean(errors.select)}
                                htmlFor='validation-basic-select'
                            >
                                Categories
                            </InputLabel>
                            <Controller
                                name='select'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        label='Categories'
                                        onChange={onChange}
                                        error={Boolean(errors.select)}
                                        labelId='validation-basic-select'
                                        aria-describedby='validation-basic-select'
                                    >
                                        <MenuItem value='UK'>UK</MenuItem>
                                        <MenuItem value='USA'>USA</MenuItem>


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
                    <Grid item xs={4} sm={4}>
                        <Button size='large' variant='contained'>
                            New Category
                        </Button>
                    </Grid>
                    {/* ---------------------------------------------------------------------------------------- */}



                    <Grid item xs={12}>
                        <FormControlLabel label='Use Config Settings' control={<Checkbox defaultChecked name='basic-checked' />} />
                    </Grid>
                </Grid>
            </form>
            {/* <div> */}

            <Accordion>
                <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                    sx={{ marginTop: '40px', marginLeft: "0px", }}
                >
                    <Typography>Configurations</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ width: "70%" }}>
                        Configurable products allow customers to choose options (Ex: shirt color). You need to create a simple product for each configuration (Ex: a product for each color).
                    </Typography>
                    <CustomButton variant='contained' onClick={handleDrawerOpen}>Create configaration</CustomButton>
                </AccordionDetails>
            </Accordion>
            <CreateProductConfig isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
            <Accordion>
                <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<AccordianIcon icon='mdi:chevron-down' />}

                >
                    <Typography>Image and Videos</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Upload />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<AccordianIcon icon='mdi:chevron-down' />}

                >
                    <Typography>Search Engine Optimization</Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='Url key'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            label='Url key'
                                            onChange={onChange}
                                            placeholder='Leonard'
                                            // error={Boolean(errors.firstName)}
                                            aria-describedby='validation-basic-first-name'
                                        />
                                    )}
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='Meta Title'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            label='Metatitle'
                                            onChange={onChange}
                                            placeholder='Leonard'
                                            aria-describedby='validation-basic-first-name'
                                        />
                                    )}
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name=' Meta Keywords'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            label=' MetaKeyword'
                                            onChange={onChange}
                                            placeholder='Leonard'
                                            aria-describedby='validation-basic-first-name'
                                        />
                                    )}
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name=' Meta Description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <>
                                            <TextField
                                                value={value}
                                                label=' MetaDescription'
                                                onChange={onChange}
                                                placeholder='Leonard'
                                                aria-describedby='validation-basic-first-name'
                                            />
                                            <h5 style={{ margin: '0px' }}>Maximum 255 chars. Meta Description should optimally be between 150-160 characters</h5>
                                        </>
                                    )}
                                />

                            </FormControl>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    id='panel-header-1'
                    aria-controls='panel-content-1'
                    expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
                    sx={{ marginLeft: "0px", }}
                >
                    <Typography>Configurations</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ width: "70%" }}>
                        Configurable products allow customers to choose options (Ex: shirt color). You need to create a simple product for each configuration (Ex: a product for each color).
                    </Typography>
                    <CustomButton variant='contained'>Custom Color</CustomButton>
                </AccordionDetails>
            </Accordion>
            {/* </div> */}


        </>
    )
}

export default CreateProduct;
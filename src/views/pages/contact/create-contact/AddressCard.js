// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { List, ListItem, ListItemIcon, Typography, Box } from '@mui/material'
import { ListItemText } from '@material-ui/core'
import countryList from 'src/data/countryList'
import zipcodeList from 'src/data/zipcodeList'
import stateList from 'src/data/stateList'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignalWifiStatusbarNull } from '@mui/icons-material'
import { useState } from 'react'
import { addVendorAddressDetails } from 'src/store/apps/vendor'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AddressCard = props => {
  const dispatch = useDispatch()
  const [sameAsBilling, setSameAsBilling] = useState(false)

  const schema = yup.object().shape({
    billingAddressLineOne: yup.string().required(),
    billingAddressLineTwo: yup.string().required(),
    billingState: yup.string().required(),
    billingCountry: yup.string().required(),
    billingPhone: yup.string().required(),
    shippingAddressLineOne: yup.string().required(),
    shippingAddressLineTwo: yup.string().required(),
    shippingState: yup.string().required(),
    shippingCountry: yup.string().required(),
    shippingPhone: yup.string().required()
  })

  const defaultValues = {
    billingAddressLineOne: '',
    billingAddressLineTwo: '',
    billingState: '',
    billingZipcode: null,
    billingCountry: '',
    billingPhone: '',
    shippingAddressLineOne: '',
    shippingAddressLineTwo: '',
    shippingState: '',
    shippingZipcode: null,
    shippingCountry: '',
    shippingPhone: ''
  }

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
    //resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    console.log(data)
    dispatch(addVendorAddressDetails(data))
      .then(response => {
        if (response?.payload?.success === true) {
          toast.success('Address saved successfully!!')
          props.handleNext()
        } else {
          toast.error('Address saving failed')
        }
      })
      .catch(error => {
        toast.error('Failed to address details. Please try again.')
        // Handle error operations here
      })
    //props.handleNext()
  }

  const handleCopyBillingAddress = () => {
    setSameAsBilling(true)
    setValue('shippingAddressLineOne', getValues('billingAddressLineOne'))
    setValue('shippingAddressLineTwo', getValues('billingAddressLineTwo'))
    setValue('shippingCountry', getValues('billingCountry'))
    setValue('shippingState', getValues('billingState'))
    setValue('shippingZipcode', getValues('billingZipcode'))
    setValue('shippingPhone', getValues('billingPhone'))
  }

  const renderFooter = () => {
    const stepCondition = props.activeStep === props.steps.length - 1

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={props.handlePrev}
          disabled={props.activeStep === 0}
          startIcon={<Icon icon='mdi:arrow-left' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={stepCondition ? 'success' : 'primary'}
          {...(!stepCondition ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
          type='submit'
          /* onClick={() => (stepCondition ? alert('Submitted..!!') : handleSubmit)} */
        >
          {stepCondition ? 'Submit' : 'Save & Next'}
        </Button>
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={8}>
        {/**
         *
         * ====================================================================================================================================
         * Billing Address
         * ====================================================================================================================================
         */}
        <Grid item lg={6} sm={6} xs={12} md={6}>
          <Box>
            <Typography variant='h6'>Billing Address</Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Address Line One</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='billingAddressLineOne'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Address Line One'
                        label='Address Line One'
                        onChange={onChange}
                        error={Boolean(errors.billingAddressLineOne)}
                        multiline
                        rows={3}
                      />
                    )}
                  />
                  {errors.billingAddressLineOne && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingAddressLineOne.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Address Line Two</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='billingAddressLineTwo'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Address Line Two'
                        label='Address Line Two'
                        onChange={onChange}
                        error={Boolean(errors.billingAddressLineTwo)}
                        multiline
                        rows={3}
                      />
                    )}
                  />
                  {errors.billingAddressLineTwo && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingAddressLineTwo.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>State</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='billing-state-label'>Select State</InputLabel>
                  <Controller
                    name='billingState'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='State'
                        id='state'
                        labelId='billing-state-label'
                        size='small'
                        fullWidth
                        placeholder='Select state'
                        onChange={onChange}
                      >
                        {stateList?.length > 0 &&
                          stateList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.billingState && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingState.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Zipcode</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='billing-zipcode-label'>Select Zipcode</InputLabel>
                  <Controller
                    name='billingZipcode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='Zipcode'
                        id='billingZipcode'
                        labelId='billing-zipcode-label'
                        size='small'
                        fullWidth
                        placeholder='Select zipcode'
                        onChange={onChange}
                      >
                        {zipcodeList?.length > 0 &&
                          zipcodeList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.billingZipcode && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingZipcode.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Country</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='gstTreatment-label'>Select Country</InputLabel>
                  <Controller
                    name='billingCountry'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='Country'
                        id='billingCountry'
                        labelId='country-label'
                        size='small'
                        fullWidth
                        placeholder='Select Country'
                        onChange={onChange}
                      >
                        {countryList?.length > 0 &&
                          countryList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.billingCountry && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingCountry.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Phone</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='billingPhone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Please fill 10 digit valid billingPhone no.'
                        label='billingPhone'
                        onChange={onChange}
                        error={Boolean(errors.billingPhone)}
                      />
                    )}
                  />
                  {errors.billingPhone && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.billingPhone.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>

        {/**
         *
         * ====================================================================================================================================
         * Shipping Address
         * ====================================================================================================================================
         */}

        {/**
         *
         * ====================================================================================================================================
         * Shipping Address
         * ====================================================================================================================================
         */}
        <Grid item lg={6} sm={6} xs={12} md={6}>
          <Box width={'100%'} display={'flex'} columnGap={4}>
            <Box>
              <Typography variant='h6'>Shipping Address</Typography>
            </Box>
            <Box>
              <Button size='small' variant='outlined' onClick={handleCopyBillingAddress}>
                Same as Billing
              </Button>
            </Box>
          </Box>
          <List>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Address Line One</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='shippingAddressLineOne'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Address Line Two'
                        label='Address Line Two'
                        onChange={onChange}
                        error={Boolean(errors.shippingAddressLineOne)}
                        multiline
                        rows={3}
                      />
                    )}
                  />
                  {errors.shippingAddressLineOne && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.shippingAddressLineOne.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Address Line Two</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='shippingAddressLineTwo'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Address Line Two'
                        label='Address Line Two'
                        onChange={onChange}
                        error={Boolean(errors.shippingAddressLineTwo)}
                        multiline
                        rows={3}
                      />
                    )}
                  />
                  {errors.shippingAddressLineTwo && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.shippingAddressLineTwo.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>State</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='shipping-state-label'>Select State</InputLabel>
                  <Controller
                    name='shippingState'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='State'
                        id='shipping-state'
                        labelId='shipping-state-label'
                        size='small'
                        fullWidth
                        placeholder='Select state'
                        onChange={onChange}
                        value={getValues('billingState')}
                      >
                        {stateList?.length > 0 &&
                          stateList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.shippingState && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.shippingState.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Zipcode</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='shipping-label'>Select Zipcode</InputLabel>
                  <Controller
                    name='shippingZipcode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='shipping-zipcode'
                        id='shipping-zipcode'
                        labelId='zipcode-label'
                        size='small'
                        fullWidth
                        onChange={onChange}
                        value={getValues('billingZipcode')}
                      >
                        {zipcodeList?.length > 0 &&
                          zipcodeList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.shippingZipcode && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.shippingZipcode.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Country</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='shipping-country-label'>Select Country</InputLabel>
                  <Controller
                    name='shippingCountry'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label='Country'
                        id='shipping-country'
                        labelId='shipping-country-label'
                        size='small'
                        fullWidth
                        placeholder='Select Country'
                        onChange={onChange}
                        value={getValues('billingCountry')}
                      >
                        {countryList?.length > 0 &&
                          countryList?.map((item, index) => {
                            return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                          })}
                      </Select>
                    )}
                  />
                  {errors.shippingCountry && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.shippingCountry.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Phone</ListItemIcon>
              <ListItemText>
                <FormControl fullWidth>
                  <Controller
                    name='shippingPhone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        size='small'
                        value={value}
                        placeholder='Please fill 10 digit valid shippingPhone no.'
                        label='shippingPhone'
                        onChange={onChange}
                        error={Boolean(errors.shippingPhone)}
                      />
                    )}
                  />
                  {errors.shippingPhone && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.shippingPhone.message}</FormHelperText>
                  )}
                </FormControl>
              </ListItemText>
            </ListItem>
          </List>
          {renderFooter()}
        </Grid>
      </Grid>
    </form>
  )
}

export default AddressCard

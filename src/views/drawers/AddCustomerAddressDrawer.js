// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addCustomer } from 'src/store/apps/user'
import userType from 'src/data/userType'
import userRoleList from 'src/data/userRoleList'
import businessTypeList from 'src/data/businessTypeList'
import zipcodeList from 'src/data/zipcodeList'
import cityList from 'src/data/cityList'
import stateList from 'src/data/stateList'
import countryList from 'src/data/countryList'
import { addCustomerShippingAddress } from 'src/store/apps/customer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  addressLineOne: yup.string().required('required'),
  addressLineTwo: yup.string().required('required'),
  landmark: yup.string().required('required')
})

const defaultValues = {
  addressLineOne: '',
  addressLineTwo: '',
  landmark: '',
  city: '',
  state: '',
  zipcode: '',
  isDefault: false
}

const AddCustomerAddressDrawer = props => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    console.log(data)
    dispatch(addCustomerShippingAddress(data))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log(response)
          if (response?.payload?.success) {
            toggle()
            reset()
            toast.success(response?.payload?.message, { theme: 'light' })
          } else {
            toast.error(response?.payload?.message, { theme: 'light' })
          }
        } else {
          toast.error('Something went wrong!', { theme: 'light' })
        }
      })
      .catch(error => {
        toast.error('Something went wrong!', { theme: 'light' })
      })
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add New Address</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='businessType-label'>Select Address Type</InputLabel>
            <Controller
              name='addressType'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Business Type'
                  id='addressType'
                  labelId='addressType-label'
                  size='small'
                  fullWidth
                  placeholder='Select Business Type'
                  onChange={onChange}
                >
                  <MenuItem value={1}>{`Shipping`}</MenuItem>
                  <MenuItem value={2}>{`Billing`}</MenuItem>
                </Select>
              )}
            />
            {errors.addressType && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.addressType.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='addressLineOne'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  multiline
                  rows={2}
                  size='small'
                  value={value}
                  label='Address Line One'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.addressLineOne)}
                />
              )}
            />
            {errors.addressLineOne && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.addressLineOne.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='addressLineTwo'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  multiline
                  rows={2}
                  size='small'
                  value={value}
                  label='Address Line Two'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.addressLineTwo)}
                />
              )}
            />
            {errors.addressLineTwo && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.addressLineTwo.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='landmark'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  multiline
                  rows={2}
                  size='small'
                  value={value}
                  label='Landmark'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.landmark)}
                />
              )}
            />
            {errors.landmark && <FormHelperText sx={{ color: 'error.main' }}>{errors.landmark.message}</FormHelperText>}
          </FormControl>
          <FormControl sx={{ mb: 6 }}>
            <InputLabel id='billing-zipcode-label'>Zipcode</InputLabel>
            <Controller
              name='zipcode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='Zipcode'
                  id='zipcode'
                  labelId='billing-zipcode-label'
                  size='small'
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
            {errors.zipcode && <FormHelperText sx={{ color: 'error.main' }}>{errors.zipcode.message}</FormHelperText>}
          </FormControl>
         
          <FormControl sx={{ mb: 6 }}>
            <InputLabel id='billing-city-label'>City</InputLabel>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='State'
                  id='city'
                  labelId='billing-city-label'
                  size='small'
                  placeholder='Select city'
                  onChange={onChange}
                >
                  {cityList?.length > 0 &&
                    cityList?.map((item, index) => {
                      return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                    })}
                </Select>
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </FormControl>
          <FormControl sx={{ mb: 6 }}>
            <InputLabel id='billing-state-label'> State</InputLabel>
            <Controller
              name='state'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  label='State'
                  id='state'
                  labelId='billing-state-label'
                  size='small'
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
            {errors.state && <FormHelperText sx={{ color: 'error.main' }}>{errors.state.message}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Save
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddCustomerAddressDrawer

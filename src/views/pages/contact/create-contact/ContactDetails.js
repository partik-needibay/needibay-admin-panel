// ** React Imports
import { useState } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Custom Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import {
  Accordion,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Switch,
  Select,
  MenuItem,
  Typography,
  Box,
  Button
} from '@mui/material'
import PageHeader from 'src/@core/components/page-header'
import paymentTerms from 'src/data/paymentTerms'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch } from 'react-redux'
import { addVendorContactDetails } from 'src/store/apps/vendor'


const data = [
  {
    value: 'individual',
    title: 'Contact Details',
    content: 'Add a contact as an individual.'
  },
  {
    value: 'organization',
    isSelected: true,
    title: 'Account Info',
    content: 'Add account information for the contact'
  }
]

const ContactDetails = props => {
  const dispatch = useDispatch()
  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }
  
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "invalid phone")
    .required("This field is required"),  })
  
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

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
    dispatch(addVendorContactDetails(data))
    props.handleNext()
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
    <Grid container spacing={5}>
      <Grid item xs={12} lg={10}>
        <PageHeader
          title={<Typography variant='h5'>Add Contact Details</Typography>}
          subtitle={<Typography variant='body2'>Add account contact details!</Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
      <List>
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>First Name</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='firstName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='Please fill first name'
                          label='First Name'
                          onChange={onChange}
                          error={Boolean(errors.firstName)}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Last Name</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='lastName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='Please fill last name'
                          label='Last Name'
                          onChange={onChange}
                          error={Boolean(errors.lastName)}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Email</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='Please fill valid email'
                          label='Email'
                          onChange={onChange}
                          error={Boolean(errors.email)}
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Phone</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='phone'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='Please fill 10 digit valid phone no.'
                          label='Phone'
                          onChange={onChange}
                          error={Boolean(errors.phone)}
                        />
                      )}
                    />
                    {errors.phone && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              {/* <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Whatsapp</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='whatsApp'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='Please fill 10 digit valid phone no.'
                          label='whatsApp'
                          onChange={onChange}
                          error={Boolean(errors.whatsApp)}
                        />
                      )}
                    />
                    {errors.whatsApp && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.whatsApp.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem> */}
              {renderFooter()}
            </form>
          </>
        </List>
      </Grid>
    </Grid>
  )
}

export default ContactDetails

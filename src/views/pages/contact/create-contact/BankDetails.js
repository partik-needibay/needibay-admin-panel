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
import { addVendorBankDetails } from 'src/store/apps/vendor'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

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

const BankDetails = props => {
  const dispatch = useDispatch()

  const theme = useTheme()

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

  const schema = yup.object().shape({
    bankName: yup.string().required(),
    bankAccountNumber: yup.string().required(),
    bankAccountName: yup.string().required(),
    ifsc: yup.string().required(),
    bankBranch: yup.string().required()
  })

  const defaultValues = {
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    ifsc: '',
    bankBranch: ''
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
    dispatch(addVendorBankDetails(data))
      .then(response => {
        if (response?.payload?.success === true) {
          toast.success('Bank details saved successfully!!')
          props.handleNext()
        } else {
          toast.error('Bank details saving failed')
        }
      })
      .catch(error => {
        toast.error('Failed to save bank details. Please try again.')
        // Handle error operations here
      })
    props.handleNext()
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} lg={10}>
        <PageHeader
          title={<Typography variant='h5'>Vendor Bank Details</Typography>}
          subtitle={<Typography variant='body2'>Add all required details related to the Company</Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <List>
            <>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Bank Name</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='bankName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='(Eg: Axis, Hdfc, ICICI......)'
                          label='Bank Name'
                          onChange={onChange}
                          error={Boolean(errors.bankName)}
                        />
                      )}
                    />
                    {errors.bankName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.bankName.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Bank Account Number</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='bankAccountNumber'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='09876543211234567890'
                          label='Bank Account Number'
                          onChange={onChange}
                          error={Boolean(errors.bankAccountNumber)}
                        />
                      )}
                    />
                    {errors.bankAccountNumber && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.bankAccountNumber.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Bank Account Name</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='bankAccountName'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='XYZ Company PVT LTD/Individual Name'
                          label='Bank Account Name'
                          onChange={onChange}
                          error={Boolean(errors.bankAccountName)}
                        />
                      )}
                    />
                    {errors.bankAccountName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.bankAccountName.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Bank Branch</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='bankBranch'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='e.g. Indiranagar, Thippasandra'
                          label='Bank Branch'
                          onChange={onChange}
                          error={Boolean(errors.bankBranch)}
                        />
                      )}
                    />
                    {errors.bankBranch && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.bankBranch.message}</FormHelperText>
                    )}
                  </FormControl>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Bank IFSC</ListItemIcon>
                <ListItemText>
                  <FormControl fullWidth>
                    <Controller
                      name='ifsc'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          size='small'
                          value={value}
                          placeholder='e.g. HDFC83928'
                          label='Bank IFSC'
                          onChange={onChange}
                          error={Boolean(errors.ifsc)}
                        />
                      )}
                    />
                    {errors.ifsc && <FormHelperText sx={{ color: 'error.main' }}>{errors.ifsc.message}</FormHelperText>}
                  </FormControl>
                </ListItemText>
              </ListItem>
              {/* <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Bank Account Type</ListItemIcon>
              <ListItemText>
                <Select
                  label='Annual Turnover'
                  defaultValue=''
                  id='demo-simple-select-outlined'
                  labelId='demo-simple-select-outlined-label'
                  size='small'
                  fullWidth
                  placeholder='Select Turnover Range'
                >
                  <MenuItem value={10}>Current</MenuItem>
                  <MenuItem value={20}>Saving</MenuItem>
                  <MenuItem value={30}>CC/OD</MenuItem>
                </Select>
              </ListItemText>
            </ListItem> */}
            </>
            {renderFooter()}
          </List>
        </form>
      </Grid>
    </Grid>
  )
}

export default BankDetails

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

const Notes = props => {
  const dispatch = useDispatch()
  // ** Hook
  const theme = useTheme()

  const schema = yup.object().shape({
    notes: yup.string().required()
  })

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    gstTreatment: '',
    paymentTerms: '',
    gstReg: '',
    pan: '',
    website: ''
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
    dispatch(addVendorAccountDetails(data))
      .then(response => {
        if (response?.payload?.success === true) {
          toast.success('Notes saved successfully!!')
          props.handleNext()
        } else {
          toast.error('Notes saving failed')
        }
      })
      .catch(error => {
        toast.error('Failed to notes. Please try again.')
        // Handle error operations here
      })
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
          onClick={onSubmit}
          /* onClick={() => (stepCondition ? alert('Submitted..!!') : handleSubmit)} */
        >
          {stepCondition ? 'Submit' : 'Save & Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Grid container spacing={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} lg={10}>
          <PageHeader
            title={<Typography variant='h5'>Add Notes</Typography>}
            subtitle={
              <Typography variant='body2'>
                Add client specific informations like requests, suggestions from client
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <List>
            <>
              <ListItem>
                <ListItemIcon sx={{ width: 175 }}>Add Notes</ListItemIcon>
                <ListItemText>
                  <Controller
                    name='notes'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        rows={4}
                        multiline
                        label='Share Notes'
                        fullWidth
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.notes)}
                      />
                    )}
                  />
                  {errors.bankAccountName && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.notes.message}</FormHelperText>
                  )}
                </ListItemText>
              </ListItem>
            </>
            {renderFooter()}
          </List>
        </Grid>
      </form>
    </Grid>
  )
}

export default Notes

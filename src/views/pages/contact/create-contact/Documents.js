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
import Upload from './upload'
import { useDispatch } from 'react-redux'
import DocumentUpload from './DocumentUpload'
import { uploadSelectVendorDocuments } from 'src/store/apps/vendor'
import { toast } from 'react-toastify'

const Documents = props => {
  const dispatch = useDispatch()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })

  const onSubmit = data => {
    dispatch(uploadSelectVendorDocuments())
      .then(response => {
        if (response?.payload?.success === true) {
          toast.success('Uploaded successfully!!')
          props.handleNext()
        } else {
          toast.error('Uploading failed')
        }
      })
      .catch(error => {
        toast.error('Failed to upload. Please try again.')
        // Handle error operations here
      })
    //props.handleNext()
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
      <Grid item xs={12} lg={10}></Grid>
      <Grid item xs={12} md={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <List>
            <ListItem>
              <ListItemIcon sx={{ width: 225 }}>Upload Documents</ListItemIcon>
              <ListItemText>
                <DocumentUpload />
              </ListItemText>
            </ListItem>
            {renderFooter()}
          </List>
        </form>
      </Grid>
    </Grid>
  )
}

export default Documents

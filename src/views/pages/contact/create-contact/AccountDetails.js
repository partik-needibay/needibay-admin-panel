// ** React Imports
import { useCallback, useEffect, useRef, useState } from 'react'
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
  Button,
  Backdrop
} from '@mui/material'
import PageHeader from 'src/@core/components/page-header'
import paymentTerms from 'src/data/paymentTerms'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'
import { addVendorAccountDetails, verifyGST } from 'src/store/apps/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import gstTreatment from 'src/data/gstTreatment'
import { toast } from 'react-toastify'
import CustomizedDialogs from 'src/components/Dialog'

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

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const AccountDetails = props => {
  // ** Hook

  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup
      .string()
      .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
      .required(),
    lastName: yup
      .string()
      .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
      .required(),
    companyName: yup
      .string()
      .min(3, obj => showErrors('Company Name', obj.value.length, obj.min))
      .required(),
    gstTreatment: yup.number().required(),
    paymentTerms: yup.number().required(),
    website: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
      .notRequired()
  })
  const [accId, setAccId] = useState(null)
  const [openGstDetails, setOpenGstDetails] = useState(false)
  const [gstDetails, setGstDetails] = useState(null)
  const [isGstVerified, setGstVerified] = useState(false)

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
  const gstInputRef = useRef(null)
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
    if (data.gstReg && !isGstVerified) {
      console.error('Please verif')
      toast.error('Please verify GST Registration Number')
      return
    }

    dispatch(addVendorAccountDetails(data))
      .then(response => {
        console.log(response)
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('Vendor account details added successfully!')

          props.handleNext()
          // Handle any other success operations here
        } else {
          toast.error('Failed to add vendor account details. Please try again.')
          // Handle error operations here
        }
      })
      .catch(error => {
        toast.error('Failed to add vendor account details. Please try again.')
        // Handle error operations here
      })
  }
  const loader = useSelector(state => state.vendor?.loader)

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

  const handleGstVerification = () => {
    setGstDetails(null)
    setGstVerified(false)
    dispatch(verifyGST(gstInputRef.current.value)).then(res => {
      // gst is verified
      if (res?.payload?.success === true && res?.payload?.data) {
        toast.success('GST Verified')
        setGstVerified(true)
        const gstRes = res.payload.data
        const gstDetailsFormatted = {
          Status: gstRes.sts,
          'Trade Name': gstRes.tradeNam,
          Address: gstRes.adadr?.[0] && Object.values(gstRes.adadr[0]?.addr).join(' ')
        }
        setGstDetails(gstDetailsFormatted)
        setOpenGstDetails(true)
      } else {
        toast.error('GST Verification failed')
        setGstVerified(false)
      }
    })
  }
  const handleAddPaymentTerms = () => {
    console.log('djrr')
  }

  const handleCloseGstDetails = useCallback(() => {
    setOpenGstDetails(false)
  }, [])

  return (
    <>
      {loader && (
        <Backdrop
          open={true}
          sx={{
            zIndex: 5,
            height: '100vh',
            color: 'common.white',
            backgroundColor: 'action.disabledBackground'
          }}
        >
          <FallbackSpinner />
        </Backdrop>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={10}>
            <PageHeader
              title={<Typography variant='h5'>Vendor Entity Details</Typography>}
              subtitle={<Typography variant='body2'>Add all required details related to the Company</Typography>}
            />
          </Grid>
          <CustomizedDialogs
            title='GST Details'
            content={
              <>
                {gstDetails &&
                  Object.keys(gstDetails).map(gstKey => {
                    if (!gstKey) {
                      return null
                    }
                    return (
                      <Box sx={{ pt: 2, pb: 1 }}>
                        <Box sx={{ display: 'flex', mb: 2.7 }}>
                          <Typography
                            variant='subtitle2'
                            style={{ fontWeight: 600 }}
                            sx={{ mr: 2, color: 'text.primary' }}
                          >
                            {gstKey}
                          </Typography>
                        </Box>
                        <Box item>
                          <Typography variant='body2'>{gstDetails[gstKey]}</Typography>
                        </Box>
                      </Box>
                    )
                  })}
              </>
            }
            open={openGstDetails}
            handleClose={handleCloseGstDetails}
          />
          <Grid item xs={12} md={8}>
            <List>
              <>
                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>Primary Contact</ListItemIcon>
                  <ListItemText>
                    <Box display={'flex'} flexDirection={'row'} columnGap={4}>
                      <Box>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='firstName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                size='small'
                                value={value}
                                onChange={onChange}
                                placeholder='e.g. Ashok Nath'
                                error={Boolean(errors.firstName)}
                              />
                            )}
                          />
                          {errors.firstName && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='lastName'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                size='small'
                                value={value}
                                onChange={onChange}
                                placeholder='e.g. Patil'
                                error={Boolean(errors.lastName)}
                              />
                            )}
                          />
                          {errors.lastName && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    </Box>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>Primary Email</ListItemIcon>
                  <ListItemText>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            size='small'
                            value={value}
                            onChange={onChange}
                            placeholder='e.g. example@needibay.com'
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
                  <ListItemIcon sx={{ width: 175 }}>Company Name</ListItemIcon>
                  <ListItemText>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='companyName'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            size='small'
                            value={value}
                            onChange={onChange}
                            placeholder='Some Example LLP'
                            error={Boolean(errors.companyName)}
                          />
                        )}
                      />
                      {errors.companyName && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.companyName.message}</FormHelperText>
                      )}
                    </FormControl>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>GST Treatment</ListItemIcon>
                  <ListItemText>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <InputLabel id='gstTreatment-label'>Select GST Treatment</InputLabel>
                      <Controller
                        name='gstTreatment'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            label='GST Treatment'
                            defaultValue=''
                            id='gstTreatment-outlined'
                            labelId='gstTreatment-outlined-label'
                            size='small'
                            fullWidth
                            placeholder='Select GST Treatment'
                            onChange={onChange}
                          >
                            {gstTreatment?.length > 0 &&
                              gstTreatment?.map((item, index) => {
                                return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                              })}
                          </Select>
                        )}
                      />
                      {errors.gstTreatment && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.gstTreatment.message}</FormHelperText>
                      )}
                    </FormControl>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>GST Registration</ListItemIcon>

                  <ListItemText>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                      <Box>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <Controller
                            name='gstReg'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                size='small'
                                value={value}
                                onChange={onChange}
                                placeholder='Please add Valid GST No. and Get Verified to add'
                                error={Boolean(errors.gstReg)}
                                inputRef={gstInputRef}
                                fullWidth
                              />
                            )}
                          />
                          {errors.gstReg && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.gstReg.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box mx={2}>
                        <Button size='small' variant='outlined' onClick={handleGstVerification}>
                          Get Taxpayer Details
                        </Button>
                      </Box>
                    </Box>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>PAN</ListItemIcon>
                  <ListItemText>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='pan'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            size='small'
                            value={value}
                            onChange={onChange}
                            placeholder='Please Add a valid PAN'
                            error={Boolean(errors.pan)}
                          />
                        )}
                      />
                      {errors.pan && <FormHelperText sx={{ color: 'error.main' }}>{errors.pan.message}</FormHelperText>}
                    </FormControl>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>Website</ListItemIcon>
                  <ListItemText>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='website'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            size='small'
                            value={value}
                            onChange={onChange}
                            placeholder='e.g. example.com'
                            error={Boolean(errors.website)}
                          />
                        )}
                      />
                      {errors.website && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.website.message}</FormHelperText>
                      )}
                    </FormControl>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ width: 175 }}>Payment Terms</ListItemIcon>
                  <ListItemText>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} width={'100%'}>
                      <Box width={'60%'}>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                          <InputLabel id='paymentTerms-label'>Select Payment Terms</InputLabel>
                          <Controller
                            name='paymentTerms'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <Select
                                label='Payment Terms'
                                defaultValue=''
                                id='payment-terms'
                                labelId='payment-terms-label'
                                size='small'
                                fullWidth
                                placeholder='Select Payment Terms'
                                onChange={onChange}
                              >
                                {paymentTerms?.length > 0 &&
                                  paymentTerms?.map((item, index) => {
                                    return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                                  })}
                              </Select>
                            )}
                          />
                          {errors.paymentTerms && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.paymentTerms.message}</FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                      <Box mx={3}>
                        <Button size='small' variant='outlined' onClick={handleAddPaymentTerms}>
                          Add More
                        </Button>
                      </Box>
                    </Box>
                  </ListItemText>
                </ListItem>
              </>
            </List>
          </Grid>
          <Grid item lg={12} md={12}>
            {renderFooter()}
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default AccountDetails

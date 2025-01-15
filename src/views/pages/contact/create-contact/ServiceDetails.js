// ** React Imports
import { useState, useEffect, useReducer } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled, alpha, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Collapse from '@mui/material/Collapse'

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
  CardContent,
  Button,
  Box,
  Tooltip
} from '@mui/material'

import PageHeader from 'src/@core/components/page-header'
import Repeater from 'src/@core/components/repeater'
import { useDispatch, useSelector } from 'react-redux'
import service, { fetchData } from 'src/store/apps/service'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  phone: yup.string().required(),
  whatsApp: yup.string().required()
})

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  whatsApp: ''
}

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.7rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const initialServiceState = []

const defaultFields = {
  id: 0,
  serviceId: Number(''),
  perHrCost: Number(''),
  hrs: Number(''),
  rentalCost: Number(''),
  tableReq: Number(''),
  powerReq: Number(''),
  speakerMicReq: Number(''),
  participantCount: Number(''),
  comment: '',
  isActive: true
}

let arr = new Array()

const serviceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_VALUE':
      return state.map(service => {
        if (service.id == action.id) {
          return { ...service, id: action.id }
        } else {
          return service
        }
      })
    case 'ADD_SERVICE':
      return { ...state, initialServiceState }
    default:
      return initialServiceState
  }
}

const ServiceDetails = props => {
  const [service, setService] = useState({
    id: 0,
    serviceId: Number(''),
    perHrCost: Number(''),
    hrs: Number(''),
    rentalCost: Number(''),
    tableReq: Number(''),
    powerReq: Number(''),
    speakerMicReq: Number(''),
    participantCount: Number(''),
    comment: '',
    isActive: true
  })
  const [serviceArr, setServiceArr] = useState([])
  const [serviceReducerArr, dispatchService] = useReducer(serviceReducer, initialServiceState)

  const dispatch = useDispatch()
  const store = useSelector(state => state.service.data)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

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

  const onChangeHandler = (e, id) => {
    e.preventDefault()
    const index = serviceArr.findIndex(s => s.id === id)
    if (index !== -1) {
      setServiceArr(prevServices =>
        prevServices.map(service => {
          if (service.id === id) {
            return { ...service, [e.target.name]: e.target.value }
          }
          return service
        })
      )
      return false
    }
  }

  const addServiceObj = e => {
    //console.log(serviceArr.length)
    arr.push(service)
    //console.log(arr)
    setServiceArr(oldArr => {
      return [...oldArr, service]
    })
  }

  useEffect(() => {
    console.log(serviceArr)
    setService({ ...service, id: service.id + 1 })
    /* setService(service => {
      service.id = service.id + 1
      return service
    }) */
  }, [serviceArr.length])

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

  const deleteForm = e => {
    e.preventDefault()
    console.log(e.target.value)
    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={10}>
        <PageHeader
          title={<Typography variant='h5'>Add Service & Vendor Specific Price</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container sx={{ mb: 6, pb: 6 }}>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button
                size='small'
                variant='contained'
                startIcon={<Icon icon='mdi:plus' fontSize={20} />}
                onClick={addServiceObj}
              >
                Add Service
              </Button>
            </Box>
          </Grid>
        </Grid>
        {serviceArr.length > 0 &&
          serviceArr.map((item, index) => {
            return (
              <RepeaterWrapper>
                <RepeatingContent>
                  <Grid container>
                    <InvoiceAction>
                      <IconButton size='small' onClick={deleteForm}>
                        <Icon icon='mdi:close' fontSize={20} />
                      </IconButton>
                    </InvoiceAction>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={5} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 3, xs: 0 }, color: 'text.primary' }}>
                          Service
                        </Typography>
                        <Select
                          fullWidth
                          size='small'
                          placeholder='Select Service'
                          name='serviceId'
                          onChange={e => onChangeHandler(e, item.id)}
                          defaultValue=''
                        >
                          <MenuItem value='' defaultChecked selected>
                            Please Select Service
                          </MenuItem>
                          {store &&
                            store.data &&
                            store.data.map((item, index) => {
                              return (
                                <MenuItem value={item.id} key={index}>
                                  {item.id}
                                </MenuItem>
                              )
                            })}
                        </Select>
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Per Hr Cost
                        </Typography>
                        <TextField
                          name='perHrCost'
                          size='small'
                          type='text'
                          placeholder='700'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      {/* <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                          <Typography
                            variant='subtitle2'
                            
                            sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                          >
                            Rental Cost
                          </Typography>
                          <TextField
                            size='small'
                            type='text'
                            placeholder='24'
                            defaultValue='24'
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </Grid> */}
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Event Hours
                        </Typography>
                        <TextField
                          name='hrs'
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Rental Cost
                        </Typography>
                        <TextField
                          name='rentalCost'
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={3} md={1} xs={12} sx={{ px: 4, my: { lg: 4 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Table Required
                        </Typography>
                        <TextField
                          name='tableReq'
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={3} md={1} xs={12} sx={{ px: 4, my: { lg: 4 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Power Required
                        </Typography>
                        <TextField
                          name='powerReq'
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={3} md={1} xs={12} sx={{ px: 4, my: { lg: 4 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Mic/Speaker Req.
                        </Typography>
                        <TextField
                          name=''
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={3} md={1} xs={12} sx={{ px: 4, my: { lg: 4 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Kids/Adult Count
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='3'
                          InputProps={{ inputProps: { min: 0 } }}
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} xs={12} sx={{ px: 4, my: { lg: 4 }, mt: 2 }}>
                        <Typography variant='subtitle2' sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}>
                          Comments
                        </Typography>
                        <TextField
                          name='comment'
                          rows={2}
                          fullWidth
                          multiline
                          size='small'
                          sx={{ mt: 3.5 }}
                          placeholder='Service Comments/Notes'
                          onChange={e => onChangeHandler(e, item.id)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </RepeatingContent>
              </RepeaterWrapper>
            )
          })}
        {renderFooter()}
      </Grid>
    </Grid>
  )
}

export default ServiceDetails

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import TreeView from '@mui/lab/TreeView'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TreeItem from '@mui/lab/TreeItem'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import {
  Button,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  FormControl,
  InputLabel
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryData, fetchProductCategoryData, updateProductCategoryData } from 'src/store/apps/service/category'
import { fetchData, createCoupon } from 'src/store/apps/coupon'
import { useEffect, useState } from 'react'
import Upload from '../../views/pages/contact/create-contact/upload'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'


// Styled TreeItem component
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  '&:hover > .MuiTreeItem-content:not(.Mui-selected)': {
    backgroundColor: theme.palette.action.hover
  },
  '& .MuiTreeItem-content': {
    paddingRight: theme.spacing(3),
    borderTopRightRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    fontWeight: theme.typography.fontWeightMedium
  },
  '& .MuiTreeItem-label': {
    fontWeight: 'inherit',
    paddingRight: theme.spacing(3)
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(4),
      fontWeight: theme.typography.fontWeightRegular
    }
  }
}))

const StyledTreeItem = props => {
  // ** Props
  const { labelText, labelIcon, labelInfo, ...other } = props
  return (
    <StyledTreeItemRoot
      {...other}
      label={
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
          <Icon icon={labelIcon} color='#FDB528' />
          <Typography variant='body2' sx={{ flexGrow: 1, fontWeight: 'inherit' }}>
            {labelText}
          </Typography>
          {labelInfo ? (
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          ) : null}
        </Box>
      }
    />
  )
}

const PromotionCreate = ({ direction }) => {
  const ExpandIcon = <Icon icon={direction === 'rtl' ? 'mdi:chevron-left' : 'mdi:chevron-right'} />
  const dispatch = useDispatch()
  const [alignment, setAlignment] = useState('PERCENT')
  const [formInitialValues, setFormInitialValues] = useState({
    couponCode: '',
    couponType: '',
    amount: '',
    percent: '',
    minOrderPrice: '',
    maxDiscountAmt: '',
    maxUsableQuantity: '',
    usageLimitPerUser: '',
    startsAt: '',
    expiresAt: '',
    isActive: false
  })

  const [category, setCategory] = useState({
    id: Number('')
  })

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const couponSchema = yup.object().shape({
    couponCode: yup.string().required('required'),
    couponType: yup.string().required('required'),
    percent: yup.string().required('required'),
    minOrderPrice: yup.string().required('required'),
    maxDiscountAmt: yup.string().required('required'),
    maxUsableQuantity: yup.string().required('required'),
    usageLimitPerUser: yup.string().required('required'),
    startsAt: yup.string().required('required'),
    expiresAt: yup.string().required('required'),
    isActive: yup.string().required('required')
  })

  const handleFormSubmit = async values => {
    dispatch(createCoupon({ ...values }))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log(response)
          if (response?.payload?.success) {
            toast.success(response?.payload?.message, { theme: 'light' })
          } else {
            toast.error("kjlkajsldj", { theme: 'light' })
          }
        } else {
          console.log(response)
          toast.error(response?.payload?.message, { theme: 'light' })
        }
      })
      .catch(error => {
        toast.error(error.meesage, { theme: 'light' })
      })
  }

  const handleEnable = async setFieldValue => {
    setFieldValue('isActive', !formInitialValues.isActive)
    setFormInitialValues({ ...formInitialValues, isActive: !formInitialValues.isActive })
  }

  const handleStartDateChange = async (val, setFieldValue) => {
    setFieldValue('startsAt', val)

    setFormInitialValues(prev => ({
      ...prev,
      startsAt: val
    }))
  }
  const handleEndDateChange = async (val, setFieldValue) => {
    setFieldValue('expiresAt', val)
    setFormInitialValues(prev => ({
      ...prev,
      expiresAt: val
    }))
  }

  return (
    <div style={{ height: '100%' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Formik initialValues={formInitialValues} validationSchema={couponSchema} onSubmit={handleFormSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                  <form
                    onSubmit={
                      handleSubmit
                    } /* onSubmit={(e) => {e.preventDefault(); console.log(errors); console.log(values)}} */
                  >
                    <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
                      {formInitialValues?.id ? (
                        <Button size='small' variant='outlined' color='primary' type='submit'>
                          Update
                        </Button>
                      ) : (
                        <Button size='small' variant='outlined' color='primary' type='submit'>
                          Save
                        </Button>
                      )}
                    </Box>
                    <List>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Type</ListItemIcon>
                        <ListItemText>
                          <FormControl fullWidth error={errors['categoryId'] ? true : false}>
                            <InputLabel id='coupon-type-label'>Coupon Type Select</InputLabel>
                            <Select
                              name='couponType'
                              label='Product Catrgory'
                              defaultValue=''
                              id='coupon-type'
                              labelId='coupon-type-label'
                              size='small'
                              fullWidth
                              onChange={handleChange}
                            >
                              <MenuItem value={''} selected>
                                None
                              </MenuItem>
                              <MenuItem value={'PERCENT'}>PERCENT</MenuItem>
                              <MenuItem value={'FLAT'}>FLAT</MenuItem>
                            </Select>
                          </FormControl>
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Publish On Create</ListItemIcon>
                        <ListItemText>
                          <Switch
                            checked={formInitialValues.isActive ? true : false}
                            onChange={() => handleEnable(setFieldValue)}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Coupon Code</ListItemIcon>

                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='couponCode'
                            label='Coupon Code'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.couponCode || ''}
                            errorText={touched.couponCode && errors.couponCode}
                            error={touched['couponCode'] && !!errors['couponCode']}
                            helperText={errors['couponCode']}
                          />
                        </ListItemText>
                      </ListItem>
                      {values.couponType == 'FLAT' && (
                        <ListItem>
                          <ListItemIcon sx={{ width: 175 }}>Amount</ListItemIcon>
                          <ListItemText>
                            <TextField
                              fullWidth
                              size='small'
                              name='amount'
                              label='Amount'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.amount || ''}
                              errorText={touched.amount && errors.amount}
                              error={touched['amount'] && !!errors['amount']}
                              helperText={errors['amount']}
                            />
                          </ListItemText>
                        </ListItem>
                      )}

                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Percent</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='percent'
                            label='Percent'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.percent || ''}
                            errorText={touched.percent && errors.percent}
                            error={touched['percent'] && !!errors['percent']}
                            helperText={errors['percent']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Min Order Price</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='minOrderPrice'
                            label='Min Order Price'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.minOrderPrice || ''}
                            errorText={touched.minOrderPrice && errors.minOrderPrice}
                            error={touched['minOrderPrice'] && !!errors['minOrderPrice']}
                            helperText={errors['minOrderPrice']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Max Discount Amount</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='maxDiscountAmt'
                            label='Max Discount Amount'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.maxDiscountAmt || ''}
                            errorText={touched.maxDiscountAmt && errors.maxDiscountAmt}
                            error={touched['maxDiscountAmt'] && !!errors['maxDiscountAmt']}
                            helperText={errors['maxDiscountAmt']}
                          />
                        </ListItemText>
                      </ListItem>

                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Max Usable Quantity</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='maxUsableQuantity'
                            label='Max Usable Quantity'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.maxUsableQuantity || ''}
                            errorText={touched.maxUsableQuantity && errors.maxUsableQuantity}
                            error={touched['maxUsableQuantity'] && !!errors['maxUsableQuantity']}
                            helperText={errors['maxUsableQuantity']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Usage Per Limit</ListItemIcon>
                        <ListItemText>
                          <TextField
                            fullWidth
                            size='small'
                            name='usageLimitPerUser'
                            label='Usage Per Limit'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.usageLimitPerUser || ''}
                            errorText={touched.usageLimitPerUser && errors.usageLimitPerUser}
                            error={touched['usageLimitPerUser'] && !!errors['usageLimitPerUser']}
                            helperText={errors['usageLimitPerUser']}
                          />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Start At</ListItemIcon>
                        {/* <TextField
                          id='datetime-local'
                          label='Next appointment'
                          type='datetime-local'
                          defaultValue='2017-05-24T10:30'
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        /> */}
                        <DateTimePicker
                          onChange={val => handleStartDateChange(dayjs(val).format('YYYY-MM-DD'), setFieldValue)}
                          name='startsAt'
                          label='Basic date time picker'
                          format='DD-MM-YYYY'
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ width: 175 }}>Expires At</ListItemIcon>
                        {/* <TextField
                          id='datetime-local'
                          label='Next appointment'
                          type='datetime-local'
                          defaultValue='2017-05-24T10:30'
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true
                          }}
                        /> */}
                        <DateTimePicker
                          onChange={val => handleEndDateChange(dayjs(val).format('YYYY-MM-DD'), setFieldValue)}
                          name='expiresAt'
                          label='Basic date time picker'
                          format='DD-MM-YYYY'
                        />
                      </ListItem>
                    </List>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default PromotionCreate

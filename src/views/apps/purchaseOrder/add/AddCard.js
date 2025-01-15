// ** React Imports
import { useState, forwardRef, useEffect, useMemo } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { Controller, useForm } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import MaterialTable, { MTableBodyRow } from 'material-table'
import { fetchData } from 'src/store/apps/catelog/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData as fetchCustomerData } from 'src/store/apps/customer'
import { fetchData as fetchUserList } from 'src/store/apps/user'
import paymentTerms from 'src/data/paymentTerms'
import { width } from 'styled-system'
import { fetchLastInvoiceId, postInvoice, previewInvoice } from 'src/store/apps/invoice'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FallbackSpinner from 'src/@core/components/spinner'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { postPurchaseOrder, previewPurchaseOrder } from 'src/store/apps/purchaseOrder'

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      {...props}
    />
  )
})

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(4)
  }
}))

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
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
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))
const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 1)

const termsDefaultContent = `# Goods once sold will not be taken back or exchanged.
# All disputes are subject to [Bengaluru] jurisdiction only.
# The company reserves the right to cancel the order if MOQ (minimum order quantity) is not
met prior to acceptance of the invoice.
# 100% advance payment is required upon acceptance of the invoice. Unless otherwise
mutually agreed upon number of days.
# Damages or shortage of Merchandises must be claimed in writing within 7 working days
from the date of delivery of goods. Do not accept merchandises in case found open at the
time of Delivery by the transporter.
# Annualised Interest 24% will be charged daily on all accounts unpaid by
due date.`

const customerNotesDefaultContent = `Bank name- RBL BANK LTD\nAccount name- NEEDIBAY INTERNET PRIVATE LIMITED\nAccount number - 409001956765\nIFSC Code - RATN0000408\nBranch Name - Frazer Town Branch`

function formatDatesInInvoice(formData) {
  let updatedFormData = { ...formData }
  if (updatedFormData.dueDate) {
    updatedFormData.dueDate = format(updatedFormData.dueDate, 'yyyy-MM-dd')
  }
  if (updatedFormData.dateIssued) {
    updatedFormData.dateIssued = format(updatedFormData.dateIssued, 'yyyy-MM-dd')
  }
  return updatedFormData
}

const AddCard = props => {
  // ** Props
  const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer } = props

  // ** States
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState('')
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate))
  const [currentProductId, setCurrentProductId] = useState(null)
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0.0)
  const [invoiceDiscount, setInvoiceDiscount] = useState(0.0)
  const [invoiceDiscountType, setInvoiceDiscountType] = useState('')
  const [invoiceAdjustment, setInvoiceAdjustment] = useState(0.0)
  const [invoiceAdjustmentType, setInvoiceAdjustmentType] = useState('addition')
  const [invoiceTaxPercent, setInvoiceTaxPercent] = useState(0.0)
  const [invoiceTaxAmount, setInvoiceTaxAmount] = useState(0.0)
  const [invoiceGrandTotal, setInvoiceGrandTotal] = useState(0.0)
  const [invoiceSubtotalWithDiscount, setInvoiceSubtotalWithDiscount] = useState(0.0)

  // ** Hook
  const theme = useTheme()

  // ** Hooks
  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchCustomerData())
    dispatch(fetchUserList())
    dispatch(fetchLastInvoiceId())
  }, [dispatch])

  const userList = useSelector(state => state.user)
  const store = useSelector(state => state.catalog)
  const customerList = useSelector(state => state.customer)
  const invoiceId = useSelector(state => state.invoice.lastInvoiceId)

  console.log(store.data.data)
  console.log(customerList.data.data)
  console.log(userList)

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  // ** Handle Purchase Order To Change
  const handleInvoiceChange = event => {
    setSelected(event.target.value)
    if (clients !== undefined) {
      setSelectedClient(clients.filter(i => i.name === event.target.value)[0])
    }
  }

  const handleProductSelect = (e, props) => {
    console.log(props)
    console.log(e.target.value)
    console.log(store?.data?.data)
    console.log(store?.data?.data?.find(o => o.id == e.target.value))
    setCurrentProductId(store?.data?.data?.find(o => o.id == e.target.value))
  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  const columns = [
    {
      title: 'Item',
      field: 'item',
      editComponent: props => (
        <Select
          size='small'
          value={props.value}
          onChange={e => {
            props.onChange(e.target.value)
            handleProductSelect(e, props)
          }}
        >
          <CustomSelectItem value=''>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}>
              <Icon icon='mdi:plus' fontSize={20} />
              Add New Product
            </Box>
          </CustomSelectItem>
          {store?.data?.data &&
            store?.data?.data.map(product => (
              <MenuItem key={product.id} value={product?.id}>
                {product?.productName}
              </MenuItem>
            ))}
        </Select>
      )
    },
    {
      title: 'Hsn',
      field: 'hsnCode',
      emptyValue: (rowData, rows) => {
        return currentProductId?.hsnCode
      },
      editComponent: props => (
        <TextField
          size='small'
          fullWidth
          type='text'
          defaultValue={currentProductId?.hsnCode}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Quantity',
      field: 'qty',
      emptyValue: (rowData, rows) => {
        return currentProductId?.moq
      },
      editComponent: props => (
        <TextField
          size='small'
          type='text'
          defaultValue={currentProductId?.moq}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Rate',
      field: 'rate',
      emptyValue: (rowData, rows) => {
        return currentProductId?.basePrice
      },
      editComponent: props => {
        return (
          <TextField
            size='small'
            name='rate'
            type='text'
            onChange={e => props.onChange(e.target.value)}
            defaultValue={currentProductId?.basePrice}
            value={props.value}
          />
        )
      }
    },
    {
      title: 'Tax',
      field: 'taxPercent',
      emptyValue: (rowData, rows) => {
        return currentProductId?.tax
      },
      editComponent: props => (
        <TextField
          size='small'
          type='text'
          defaultValue={currentProductId?.taxPercent}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Commission',
      field: 'commission',

      editComponent: props => (
        <Box display={'flex'} flexDirection={'column'} rowGap={2}>
          <Select size='small' value={props.value} onChange={e => props.onChange(e.target.value)}>
            <MenuItem value={'flat'}>Flat</MenuItem>
            <MenuItem value={'percent'}>Percent</MenuItem>
          </Select>
        </Box>
      )
    },
    {
      title: 'Comm. V',
      field: 'commissionValue',
      emptyValue: (rowData, rows) => {
        return currentProductId?.baseCommission
      },
      editComponent: props => (
        <Box display={'flex'} flexDirection={'column'} rowGap={2}>
          <TextField
            name='commision'
            size='small'
            type='text'
            placeholder='comission'
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        </Box>
      )
    },
    {
      title: 'Amount',
      field: 'amount',
      editable: 'never',
      emptyValue: (rowData, rows) => {
        const amt = getRowTotalAmout(rowData)
        if (isNaN(amt)) {
          return '0.00'
        } else {
          amt.toFixed(2)
        }
      },
      render: rowData => {
        return getRowTotalAmout(rowData).toFixed(2)
      }
    }
  ]

  const getRowTotalAmout = rowData => {
    let rowTotalAmount = 0.0
    const commission = rowData?.commission
    const commissionValue = parseFloat(rowData?.commissionValue)
    const ItemRate = parseFloat(rowData?.rate)
    const quantity = parseFloat(rowData?.qty)
    const taxPercent = parseFloat(rowData?.taxPercent)
    rowTotalAmount = quantity * ItemRate
    if (commission == 'percent') {
      rowTotalAmount += (rowTotalAmount * commissionValue) / 100
    }
    if (commission == 'flat') {
      rowTotalAmount += commissionValue
    }
    rowTotalAmount += (rowTotalAmount * taxPercent) / 100
    return rowTotalAmount
  }

  const getTaxTotal = data => {
    let taxTotal = 0.0
    let subtotal = 0.0
    let subtotalWithDiscount = 0.0
    data.map(item => {
      const rate = parseFloat(item?.rate)
      const qty = parseFloat(item?.qty)
      const taxPercent = parseFloat(item?.taxPercent)
      const commisionVal = parseFloat(item?.commissionValue)
      subtotal += rate * qty
      if (item?.commission == 'percent') {
        subtotal += (subtotal * commisionVal) / 100
      }
      if (item?.commission == 'flat') {
        subtotal += commisionVal
      }
      if (invoiceDiscount > 0) {
        if (invoiceDiscountType == 'percent') {
          subtotalWithDiscount = subtotal - (subtotal * parseFloat(invoiceDiscount)) / 100
        }
        if (invoiceDiscountType == 'flat') {
          subtotalWithDiscount = subtotal - invoiceDiscount
        }
        setInvoiceSubtotalWithDiscount(subtotalWithDiscount.toFixed(2))
      }
      if (invoiceDiscount > 0) {
        taxTotal += (subtotalWithDiscount * taxPercent) / 100
      } else {
        taxTotal += (subtotal * taxPercent) / 100
      }
    })
    return taxTotal.toFixed(2)
  }

  const getGrandTotal = data => {
    let grandTotal = 0.0
    grandTotal = parseFloat(invoiceSubtotal) + parseFloat(invoiceTaxAmount)
    if (invoiceSubtotalWithDiscount > 0) {
      grandTotal = parseFloat(invoiceSubtotalWithDiscount) + parseFloat(invoiceTaxAmount)
    }
    if (invoiceAdjustmentType == 'addition' && invoiceAdjustment > 0) {
      grandTotal += parseFloat(invoiceAdjustment)
    }
    if (invoiceAdjustmentType == 'substract' && invoiceAdjustment > 0) {
      grandTotal -= parseFloat(invoiceAdjustment)
    }
    return grandTotal.toFixed(2)
  }

  const getSubtotal = data => {
    let subtotal = 0.0
    let subtotalWithDiscount = 0.0
    data.map(item => {
      const rate = parseFloat(item?.rate)
      const qty = parseFloat(item?.qty)
      const commisionVal = parseFloat(item?.commissionValue)

      subtotal += rate * qty

      if (item.commission == 'percent') {
        subtotal += (subtotal * commisionVal) / 100
      }
      if (item.commission == 'flat') {
        subtotal += commisionVal
      }
      if (invoiceDiscountType == 'percent') {
        subtotalWithDiscount = subtotal - (subtotal * parseFloat(invoiceDiscount)) / 100
      }
      if (invoiceDiscountType == 'flat') {
        subtotalWithDiscount = subtotal - invoiceDiscount
      }
      setInvoiceSubtotalWithDiscount(subtotalWithDiscount.toFixed(2))
    })
    return subtotal.toFixed(2)
  }

  const getAdjustedAmount = values => {
    if (values?.adjustmentType == 'addition') {
      setInvoiceAdjustment(parseFloat(values.adjustment))
      return '+' + parseFloat(values.adjustment)
    }
    if (values?.adjustmentType == 'substract') {
      setInvoiceAdjustment(-parseFloat(values.adjustment))
      return '-' + parseFloat(values.adjustment)
    }
  }

  const [data, setData] = useState([])

  useEffect(() => {
    console.log(data)
    setInvoiceSubtotal(getSubtotal(data))
    setInvoiceTaxAmount(getTaxTotal(data))
  }, [data, invoiceDiscount])

  useEffect(() => {
    console.log(data)
    setInvoiceTaxAmount(getTaxTotal(data))
  }, [invoiceSubtotal])

  useEffect(() => {
    setInvoiceGrandTotal(getGrandTotal)
  }, [invoiceSubtotal, invoiceSubtotalWithDiscount, invoiceAdjustment, invoiceTaxPercent])

  const schema = yup.object().shape({
    /* customerId: yup.number().required('Please Select Customer'),
    invoiceId: yup.number().required('Purchase Order Id is required'),
    salesPersonId: yup.number().required(),
    customerNotes: yup.string().required(),
    terms: yup.string().required(),
    paymentTerms: yup.number().required(),
    items: yup.string().required(),
    dateIssued: yup.string().required(),
    dueDate: yup.string().required() */
  })

  const defaultValues = useMemo(
    () => ({
      customerId: null,
      invoiceId: invoiceId,
      salesPersonId: '',
      customerNotes: customerNotesDefaultContent,
      terms: termsDefaultContent,
      paymentTerms: '',
      items: '',
      dateIssued: new Date(),
      dueDate: new Date(),
      subTotal: '',
      discount: '',
      discountType: '',
      tax: '',
      adjustment: '',
      grandTotal: '',
      adjustmentType: ''
    }),
    [invoiceId]
  )

  const handlePaymentTermsChange = async (val, setFieldValue) => {
    setFieldValue('paymentTerms', val)
    //setFormInitialValues({ ...formInitialValues, paymentTerms: val })
  }
  const handleCustomerChange = async (val, setFieldValue) => {
    setFieldValue('customerId', val)
    //setFormInitialValues({ ...formInitialValues, customerId: val })
  }
  const handleSalesPersonChange = async (val, setFieldValue) => {
    setFieldValue('salesPersonId', val)
    //setFormInitialValues({ ...formInitialValues, salesPersonId: val })
  }

  const handleDiscountTypeChange = async (val, setFieldValue) => {
    setFieldValue('discountType', val)
    setInvoiceDiscountType(val)
    //setFormInitialValues({ ...formInitialValues, salesPersonId: val })
  }

  const handleDiscountChange = async (val, setFieldValue) => {
    setFieldValue('discount', val)
    setInvoiceDiscount(val)
    //setFormInitialValues({ ...formInitialValues, salesPersonId: val })
  }

  const handleAdjustmentTypeChange = async (val, setFieldValue) => {
    setFieldValue('adjustmentType', val)
    setInvoiceAdjustmentType(val)
    //setFormInitialValues({ ...formInitialValues, salesPersonId: val })
  }
  const handleInvoiceAdjustmentAmount = async (val, setFieldValue) => {
    setFieldValue('adjustment', val)
    setInvoiceAdjustment(val)
    //setFormInitialValues({ ...formInitialValues, salesPersonId: val })
  }

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange'
  })

  const handlePreviewPurchaseOrder = formData => () => {
    console.log(data.length)
    if (data.length == 0) {
      return false
    }
    formData.adjustment = parseFloat(invoiceAdjustment)
    formData.adjustmentType = invoiceAdjustmentType
    formData.discount = parseFloat(invoiceDiscount)
    formData.discountType = invoiceDiscountType
    formData.subtotal = invoiceSubtotal
    formData.tax = invoiceTaxAmount
    formData.items = JSON.stringify(data)
    formData.grandTotal = invoiceGrandTotal
    formData.subtotalWithDiscount = invoiceSubtotalWithDiscount
    formData = formatDatesInInvoice(formData)
    dispatch(previewPurchaseOrder(formData))
      .then(response => {
        console.log('preview invoice', response)
        if (response?.payload?.success === true) {
          router.push('/apps/purchase-order/preview/view')
        } else {
          toast.error('Purchase Order preview failed.')
        }
      })
      .catch(error => {
        toast.error('Failed to preview invoice. Please try again.')
        // Handle error operations here
      })

    console.log(formData)
  }

  const handleFormSubmit = formData => {
    console.log(data.length)
    if (data.length == 0) {
      return false
    }
    formData.adjustment = parseFloat(invoiceAdjustment)
    formData.adjustmentType = invoiceAdjustmentType
    formData.discount = parseFloat(invoiceDiscount)
    formData.discountType = invoiceDiscountType
    formData.subtotal = invoiceSubtotal
    formData.tax = invoiceTaxAmount
    formData.items = JSON.stringify(data)
    formData.grandTotal = invoiceGrandTotal
    formData.subtotalWithDiscount = invoiceSubtotalWithDiscount

    formData = formatDatesInInvoice(formData)

    dispatch(postPurchaseOrder(formData))
      .then(response => {
        if (response?.payload?.success === true) {
          toast.success('Purchase Order generated successfully!!')
          router.push('/apps/purchase-order/list')
        } else {
          toast.error('Purchase Order generation failed.')
        }
      })
      .catch(error => {
        toast.error('Failed to generate invoice. Please try again.')
        // Handle error operations here
      })

    console.log(formData)
  }

  return (
    <Formik enableReinitialize initialValues={defaultValues} validationSchema={schema} onSubmit={handleFormSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit} /* onSubmit={(e) => {e.preventDefault(); console.log(errors); console.log(values)}} */
        >
          <Grid container spacing={6}>
            <Grid item xl={9} md={8} xs={12}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src='/images/logo.png' width={'200px'} />
                          </Box>
                        </Box>
                        <div>
                          <Box>
                            <Typography variant='body2' sx={{ mb: 1 }}>
                              652, 22nd Cross, 23rd Main Rd, Parangi Palaya,
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1 }}>
                              Sector 2, HSR Layout, Bengaluru, Karnataka 560102
                            </Typography>
                            <Typography variant='body2'>+91-6360093076</Typography>
                          </Box>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xl={6} xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: { xl: 'flex-end', xs: 'flex-start' }
                        }}
                      >
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <Typography variant='h6' sx={{ mr: 1, width: '105px' }}>
                            Purchase Order
                          </Typography>
                          <TextField
                            fullWidth
                            size='small'
                            type='number'
                            disabled
                            name='invoiceId'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.invoiceId || ''}
                            errorText={touched.invoiceId && errors.invoiceId}
                            error={touched['invoiceId'] && !!errors['invoiceId']}
                            helperText={errors['invoiceId']}
                          />
                        </Box>
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                            Date Issued:
                          </Typography>
                          <DatePicker
                            id='issue-date'
                            selected={values.dateIssued}
                            customInput={<CustomInput />}
                            minDate={new Date()}
                            onChange={date => setFieldValue('dateIssued', date)}
                            name='dateIssued'
                            value={values.dateIssued}
                          />
                        </Box>
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                          <Typography variant='body2' sx={{ width: '250px' }}>
                            Payment Terms:
                          </Typography>
                          <Select
                            label='Payment Terms'
                            defaultValue=''
                            id='payment-terms'
                            labelId='payment-terms-label'
                            size='small'
                            fullWidth
                            placeholder='Select Payment Terms'
                            name='paymentTerms'
                            onChange={e => handlePaymentTermsChange(e.target.value, setFieldValue)}
                          >
                            {paymentTerms?.length > 0 &&
                              paymentTerms?.map((item, index) => {
                                return <MenuItem value={item?.value}>{item?.label}</MenuItem>
                              })}
                          </Select>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                          <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                            Date Due:
                          </Typography>
                          <DatePicker
                            id='due-date'
                            selected={values.dueDate || new Date(tomorrowDate)}
                            minDate={new Date()}
                            customInput={<CustomInput />}
                            onChange={date => setFieldValue('dueDate', date)}
                            name='dueDate'
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

                <CardContent sx={{ pb: 2 }}>
                  <Grid container>
                    <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
                      <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary' }}>
                        Purchase Order To:
                      </Typography>
                      <Select
                        size='small'
                        onChange={e => handleCustomerChange(e.target.value, setFieldValue)}
                        sx={{ mb: 4, width: '200px' }}
                        name='customerId'
                        errorText={touched.customerId && errors.customerId}
                        error={touched['customerId'] && !!errors['customerId']}
                        helperText={errors['customerId']}
                      >
                        <CustomSelectItem value='' onClick={handleAddNewCustomer}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                          >
                            <Icon icon='mdi:plus' fontSize={20} />
                            Add New Customer
                          </Box>
                        </CustomSelectItem>
                        {customerList?.data?.data !== undefined &&
                          customerList?.data?.data?.map(customer => (
                            <MenuItem value={customer?.id} selected={customer?.id == values?.customerId}>
                              {customer?.fullName}
                            </MenuItem>
                          ))}
                      </Select>
                      {selectedClient !== null && selectedClient !== undefined ? (
                        <div>
                          <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                            {selectedClient.company}
                          </Typography>
                          <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                            {selectedClient.address}
                          </Typography>
                          <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                            {selectedClient.contact}
                          </Typography>
                          <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                            {selectedClient.companyEmail}
                          </Typography>
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
                      <div>
                        <Typography variant='subtitle2' sx={{ mb: 2.5, color: 'text.primary' }}>
                          Customer Details:
                        </Typography>
                        {values?.customerId && (
                          <TableContainer>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <MUITableCell>
                                    <Typography variant='body2'>Name: </Typography>
                                  </MUITableCell>
                                  <MUITableCell>
                                    <Typography variant='body2'>
                                      {customerList?.data?.data.find(o => o.id == values?.customerId).fullName}
                                    </Typography>
                                  </MUITableCell>
                                </TableRow>
                                <TableRow>
                                  <MUITableCell>
                                    <Typography variant='body2'>Email:</Typography>
                                  </MUITableCell>
                                  <MUITableCell>
                                    <Typography variant='body2'>
                                      {customerList?.data?.data.find(o => o.id == values?.customerId).email}
                                    </Typography>
                                  </MUITableCell>
                                </TableRow>
                                <TableRow>
                                  <MUITableCell>
                                    <Typography variant='body2'>Phone:</Typography>
                                  </MUITableCell>
                                  <MUITableCell>
                                    <Typography variant='body2'>
                                      {customerList?.data?.data.find(o => o.id == values?.customerId).phone}
                                    </Typography>
                                  </MUITableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />
                <Box p={4}>
                  <MaterialTable
                    icons={tableIcons}
                    title='Custom Edit Component Preview'
                    columns={columns}
                    data={data}
                    options={{
                      paging: false,
                      search: false,
                      showTitle: false
                    }}
                    editable={{
                      onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            console.log('=====================line 524 ======================')
                            console.log(newData)
                            if (!newData?.rate) {
                              newData.rate = currentProductId?.basePrice
                            }
                            if (!newData?.hsnCode) {
                              newData.hsnCode = currentProductId?.hsnCode
                            }
                            if (!newData?.taxPercent) {
                              newData.taxPercent = currentProductId?.taxPercent
                            }
                            if (!newData?.amount) {
                              newData.amount = getRowTotalAmout(newData)
                            }
                            setData([...data, newData])
                            resolve()
                          }, 1000)
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...data]
                            const index = oldData.tableData.id
                            dataUpdate[index] = newData
                            setData([...dataUpdate])

                            resolve()
                          }, 1000)
                        }),
                      onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataDelete = [...data]
                            const index = oldData.tableData.id
                            dataDelete.splice(index, 1)
                            setData([...dataDelete])

                            resolve()
                          }, 1000)
                        })
                    }}
                  />
                </Box>

                <Divider />

                <CardContent>
                  <Grid container columnSpacing={8}>
                    <Grid item xs={12} sm={6} sx={{ order: { sm: 1, xs: 2 } }}>
                      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant='body2'
                          sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
                        >
                          Salesperson:
                        </Typography>
                        <Select
                          size='small'
                          sx={{ mb: 4, width: '200px' }}
                          onChange={e => handleSalesPersonChange(e.target.value, setFieldValue)}
                          name='salesPersonId'
                        >
                          <CustomSelectItem value='' onClick={handleAddNewCustomer}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', color: 'success.main', '& svg': { mr: 2 } }}
                            >
                              <Icon icon='mdi:plus' fontSize={20} />
                              Add New User
                            </Box>
                          </CustomSelectItem>
                          {userList?.data !== undefined &&
                            userList?.data?.map(user => (
                              <MenuItem selected={user?.id == values.salesPersonId} key={user?.id} value={user?.id}>
                                {user?.fullName}
                              </MenuItem>
                            ))}
                        </Select>
                      </Box>
                      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography
                          variant='body2'
                          sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
                        >
                          Customer Notes:
                        </Typography>

                        <TextField
                          name='customerNotes'
                          multiline
                          rows={4}
                          size='small'
                          fullWidth
                          placeholder='Thanks for your business'
                          defaultValue={customerNotesDefaultContent}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                      <CalcWrapper>
                        <Typography variant='body2'>Subtotal:</Typography>
                        <Box display={'flex'} columnGap={3}>
                          <Typography
                            variant='body2'
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              lineHeight: '.25px',
                              textDecoration: invoiceSubtotalWithDiscount > 0 ? 'line-through' : 'none'
                            }}
                          >
                            {`Rs.${invoiceSubtotal}/-`}
                          </Typography>
                          {invoiceSubtotalWithDiscount > 0 && (
                            <Typography
                              variant='body2'
                              sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                lineHeight: '.25px'
                              }}
                            >
                              {invoiceSubtotalWithDiscount > 0 && `Rs. ${invoiceSubtotalWithDiscount}/-`}
                            </Typography>
                          )}
                        </Box>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Box display={'flex'} alignItems={'center'}>
                          <Box width={'85px'}>
                            <Typography variant='body2'>Discount:</Typography>
                          </Box>
                          <Box display={'flex'} ml={4}>
                            <Select
                              size='small'
                              name='discountType'
                              style={{ width: '75px' }}
                              onChange={e => handleDiscountTypeChange(e.target.value, setFieldValue)}
                            >
                              <MenuItem selected value={'percent'}>
                                % Per
                              </MenuItem>
                              <MenuItem value={'flat'}>Flat</MenuItem>
                            </Select>
                            <TextField
                              name='discount'
                              size='small'
                              label='discount'
                              style={{ width: '75px' }}
                              onChange={e => handleDiscountChange(e.target.value, setFieldValue)}
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}
                          >
                            {invoiceDiscountType == 'percent' && <>{`${Number(invoiceDiscount).toFixed(2)}%`}&emsp;</>}
                            {invoiceDiscount ? (
                              <>{` Rs.${(invoiceSubtotal - invoiceSubtotalWithDiscount).toFixed(2)}/-`}</>
                            ) : (
                              <>Not Applied</>
                            )}
                          </Typography>
                        </Box>
                      </CalcWrapper>

                      <CalcWrapper>
                        <Box display={'flex'} alignItems={'center'}>
                          <Box width={'85px'}>
                            <Typography variant='body2'>Tax:</Typography>
                          </Box>
                          {/* <Box display={'flex'} justifyContent={'flex-start'} ml={4}>
                            <TextField name='tax' size='small' label='Tax Percent' onChange={handleChange} />
                          </Box> */}
                        </Box>
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}
                          >
                            {`Rs.${invoiceTaxAmount}/-`}
                          </Typography>
                        </Box>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Box display={'flex'} marginRight={5} alignItems={'center'}>
                          <Box width={'85px'}>
                            <Typography variant='body2'>Adjustments:</Typography>
                          </Box>
                          <Box display={'flex'} ml={4}>
                            <Select
                              size='small'
                              name='adjustmentType'
                              style={{ width: '120px' }}
                              onChange={e => handleAdjustmentTypeChange(e.target.value, setFieldValue)}
                            >
                              <MenuItem selected value='addition'>
                                Add Value
                              </MenuItem>
                              <MenuItem value='substract'>Substract Value</MenuItem>
                            </Select>
                            <TextField
                              name='adjustment'
                              size='small'
                              onChange={e => handleInvoiceAdjustmentAmount(e.target.value, setFieldValue)}
                              label='Adjustment'
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}
                          >
                            {invoiceAdjustment}
                          </Typography>
                        </Box>
                      </CalcWrapper>
                      <Divider
                        sx={{
                          mt: theme => `${theme.spacing(6)} !important`,
                          mb: theme => `${theme.spacing(1.5)} !important`
                        }}
                      />
                      <CalcWrapper>
                        <Typography variant='body2'>Grand Total:</Typography>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}
                        >
                          {`Rs.${invoiceGrandTotal}/-`}
                        </Typography>
                      </CalcWrapper>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

                <CardContent sx={{ pt: 4 }}>
                  <InputLabel htmlFor='invoice-note'>Terms & Conditions:</InputLabel>
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    name='terms'
                    id='invoice-note'
                    sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
                    defaultValue={termsDefaultContent}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
              <Card>
                <CardContent>
                  {/*  <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<Icon icon='mdi:send-outline' />}>
              Send Purchase Order
            </Button> */}
                  <Button fullWidth sx={{ mb: 3.5 }} variant='outlined' onClick={handlePreviewPurchaseOrder(values)}>
                    Preview
                  </Button>
                  <Button type='submit' fullWidth variant='outlined' sx={{ mb: 3.5 }}>
                    Save & Send Purchase Order
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default AddCard

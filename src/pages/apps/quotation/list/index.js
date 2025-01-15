// ** React Imports
import { useState, useEffect, forwardRef, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/quotations'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import PageHeader from 'src/@core/components/page-header'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'mdi:send' },
  Paid: { color: 'success', icon: 'mdi:check' },
  Draft: { color: 'primary', icon: 'mdi:content-save-outline' },
  'Partial Payment': { color: 'warning', icon: 'mdi:chart-pie' },
  'Past Due': { color: 'error', icon: 'mdi:information-outline' },
  Downloaded: { color: 'info', icon: 'mdi:arrow-down' }
}

// ** renders client column
const renderClient = row => {
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates?.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const QuotationList = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const ability = useContext(AbilityContext)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.quotation?.data)

  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value, dates])

  const handleFilter = val => {
    setValue(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const defaultColumns = [
    {
      flex: 1,
      field: 'id',
      headerName: 'Quotation Id',
      renderCell: ({ row }) => {
        const { quotationId } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {quotationId}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'customerInfo',
      headerName: 'Customer Info',
      renderCell: ({ row }) => {
        const { customerEmail, customerPhone, customeFullname } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='/apps/user/view/overview/'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {customeFullname}
              </Typography>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href='/apps/user/view/overview/'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {customerPhone}
              </Typography>
              <Typography
                noWrap
                variant='body2'
                component={Link}
                href={`${customerEmail}`}
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`@${customerEmail}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'grandTotal',
      headerName: 'Grand Total',
      renderCell: ({ row }) => {
        const { grandTotal } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                {`Rs.${grandTotal}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'subtotal',
      headerName: 'SubTotal',
      renderCell: ({ row }) => {
        const { subtotal } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                {`Rs.${subtotal}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 1,
      field: 'taxAmount',
      headerName: 'Tax Amount',
      renderCell: ({ row }) => {
        const { taxAmount } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                {`Rs.${taxAmount}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 1,
      field: 'subtotalWithDiscount',
      headerName: 'Discounted Subtotal',
      renderCell: ({ row }) => {
        const { subtotalWithDiscount } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none'
                }}
              >
                {`Rs.${subtotalWithDiscount}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.3,
      maxWidth: 145,
      minWidth: 125,
      field: 'isEmailSend',
      headerName: 'Is Send',
      renderCell: ({ row }) => {
        return (
          <Box my={1}>
            <CustomChip
              label={row.isEmailSend ? 'Sent' : 'Not Sent'}
              skin='light'
              color={row.isEmailSend ? 'success' : 'error'}
            />
          </Box>
        )
      }
    }
  ]

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/apps/quotation/preview/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={9}>
          <PageHeader
            title={<Typography variant='h5'>Quotations</Typography>}
            subtitle={<Typography variant='body2'></Typography>}
          />
        </Grid>
        <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
          <Box>
            {ability?.can(['add'], 'product') && (
              <Link href='/apps/quotation/add'>
                <Button variant='contained'>Add New Quotation</Button>
              </Link>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {store.data && (
              <DataGrid
                autoHeight
                pagination
                rows={store.data}
                rowHeight={125}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                pageSize={Number(pageSize)}
                rowsPerPageOptions={[10, 25, 50]}
                onSelectionModelChange={rows => setSelectedRows(rows)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default QuotationList

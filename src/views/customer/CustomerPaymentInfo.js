import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/lead'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import Chip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  Active: 'success',
  pending: 'warning',
  inactive: 'secondary',
  Deleted: 'error',
  Archived: 'warning'
}

const leadSourceObject = {
  Email: { icon: 'ic:baseline-email', color: '#86888A' },
  Facebook: { icon: 'ic:baseline-facebook', color: '#2374e1' },
  Instagram: { icon: 'uil:instagram-alt', color: '#F56040' },
  Whatsapp: { icon: 'logos:whatsapp-icon', color: '#2374e1' },
  Webform: { icon: 'mdi:web', color: '#abc298' },
  LinkedIn: { icon: 'mdi:linkedin', color: '#00A0DC' },
  Twitter: { icon: 'ant-design:twitter-circle-filled', color: '#1DA1F2' }
}

// ** renders client column

const renderClient = row => {
  return <CustomAvatar src={'/images/avatars/3.png'} sx={{ mr: 3, width: 34, height: 34 }} />
}

const CustomerPaymentInfo = ({ data }) => {
  const [plan, setPlan] = useState('')
  // const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const columns = [
    {
      flex: 0.35,
      field: 'id',
      headerName: 'Payment Id',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {`${row.id}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'orderId',
      maxWidth: 275,
      headerName: 'Order Id',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {row.orderId}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'totalAmount',
      maxWidth: 275,
      headerName: 'Total Amount',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {`Rs.${row.totalAmount}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'paidAmount',
      maxWidth: 275,
      headerName: 'Paid Amount',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {`Rs.${row.paidAmount}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      field: 'dueAmount',
      maxWidth: 275,
      headerName: 'Due Amount',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {`Rs.${row.dueAmount}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'action',
      headerName: 'Action',
      renderCell: ({ row }) => <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}></Box>
    }
  ]
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // ** Hooks
  // ** Hooks
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchData())
    },
    () => {},
    []
  )

  const store = useSelector(state => state.service)
  console.log(store.data.data)

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {data?.length > 0 && (
            <DataGrid
              autoHeight
              rowHeight={75}
              rows={data}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerPaymentInfo

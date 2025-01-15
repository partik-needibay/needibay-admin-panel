// ** React Imports
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
import { fetchCustomerAddressByCustomerId, fetchData } from 'src/store/apps/customer'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import Chip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'
import { flex } from 'styled-system'
import { setCustomer } from 'src/store/apps/order'

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

const columns = [
  {
    flex: 1,
    field: 'Name',
    headerName: 'fullName',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              variant='subtitle2'
              href={`/customer/profile/${row.id}`}
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${row.fullName}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 1,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 1,
    field: 'pno',
    headerName: 'Phone Number',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.message}
        </Typography>
      )
    }
  },
  {
    flex: 1,
    field: 'Address',
    headerName: 'Address',
    renderCell: ({ row }) => {
      return (
        // <>
        //   <CustomChip
        //     skin='light'
        //     size='small'
        //     label={row.quotations.length > 0 ? 'Generated' : 'Pending'}
        //     color={row.quotations.length > 0 ? 'success' : 'error'}
        //     sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
        //   />
        // </>
        <Typography variant='body2' noWrap>
          Bengalore
        </Typography>
      )
    }
  },
  {
    flex: 1,
    field: 'Last Login',
    headerName: 'Last Login',
    renderCell: ({ row }) => {
      return (
        // <>
        //   <CustomChip
        //     skin='light'
        //     size='small'
        //     label={row.quotations.length > 0 ? 'Generated' : 'Pending'}
        //     color={row.quotations.length > 0 ? 'success' : 'error'}
        //     sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
        //   />
        // </>
        <Typography variant='body2' noWrap>
          Bengalore
        </Typography>
      )
    }
  }
]

const CustomerSelectTable = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch, plan, value])

  const store = useSelector(state => state.customer)
  const router = useRouter()

  const handleCustomerSelect = (data) => {
    dispatch(fetchCustomerAddressByCustomerId(data[0]))
    dispatch(setCustomer(data[0]))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data?.data && (
            <DataGrid
              autoHeight
              rows={store.data?.data}
              rowHeight={85}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={handleCustomerSelect}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerSelectTable

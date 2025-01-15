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
import { fetchData } from 'src/store/apps/invoice'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'

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

const columns = [
  {
    flex: 0.2,
    maxWidth: 75,
    field: 'id',
    headerName: 'Invoice Id',
    renderCell: ({ row }) => {
      const { id } = row

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
              {id}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'grandTotal',
    headerName: 'Grand Total',
    renderCell: ({ row }) => {
      const { grandTotal } = row

      return (
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
          {`Rs.${grandTotal}/-`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'discountAmount',
    headerName: 'Discount Amount',
    renderCell: ({ row }) => {
      const { discountAmount } = row

      return (
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
          {`Rs.${discountAmount}/-`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'orderId',
    headerName: 'Order Id',
    renderCell: ({ row }) => {
      const { orderId } = row
      return (
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
          {`ORD000${orderId}`}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => (
      <IconButton component={Link} href='#'>
        <Icon icon='mdi:eye-outline' />
      </IconButton>
    )
  }
]

const InvoiceTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatchEvent])

  const store = useSelector(state => state.invoice.data)
  console.log(store)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {/* <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} /> */}
          {store && store.data && (
            <DataGrid
              autoHeight
              rowHeight={75}
              rows={store.data}
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

export default InvoiceTable

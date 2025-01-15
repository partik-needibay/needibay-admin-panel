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
import { fetchData } from 'src/store/apps/lead'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import Chip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

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
    flex: 0.1,
    field: 'order',
    maxWidth: 100,
    headerName: 'Request ID',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {`#${row.id}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    maxWidth: 175,
    field: 'fullName',
    headerName: 'Enquiry From',
    renderCell: ({ row }) => {
      const { fullName, phone } = row

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
              {fullName}
            </Typography>
            <Typography
              noWrap
              variant='body2'
              component={Link}
              href={`tel:${phone}`}
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {`@${phone}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 155,
    maxWidth: 250,
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
    flex: 0.3,
    maxWidth: 145,
    minWidth: 125,
    field: 'message',
    headerName: 'Mesasge',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.message}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 145,
    field: 'assignee',
    headerName: 'assignee',
    renderCell: ({ row }) => {
      return (
        <>
          {renderClient(row)}
          <Typography variant='body2' noWrap>
            {row.email}
          </Typography>
        </>
      )
    }
  }
]

const LeadList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('use effect called')
    dispatch(fetchData())
  }, [dispatch, plan, value])

  const store = useSelector(state => state.lead)
  const router = useRouter()

  const handleFilter = useCallback(val => {
    console.log(val)
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          {store.data && (
            <DataGrid
              autoHeight
              rows={store.data}
              rowHeight={85}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              components={{
                Toolbar: GridToolbar
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default LeadList

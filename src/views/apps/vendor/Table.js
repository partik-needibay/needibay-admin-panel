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
import { fetchData } from 'src/store/apps/vendor'

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
    minWidth: 230,
    field: 'name',
    headerName: 'Vendor',
    renderCell: ({ row }) => {
      const { name, email } = row

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
              {name}
            </Typography>
            <Typography
              noWrap
              variant='body2'
              component={Link}
              href={`${email}`}
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {`@${email}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 230,
    field: 'contact',
    headerName: 'Contact Person',
    renderCell: ({ row }) => {
      const { contact } = row

      if (contact.length > 0) {
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
                {`${contact[0].firstName} ${contact[0].lastName}`}
              </Typography>
              <Typography
                noWrap
                variant='body2'
                component={Link}
                href={`${contact[0].email}`}
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`@${contact[0].email}`}
              </Typography>
              <Typography
                noWrap
                variant='body2'
                component={Link}
                href={`${contact[0].phone}`}
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`${contact[0].phone}`}
              </Typography>
            </Box>
          </Box>
        )
      } else {
        return (
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
            <Box pb={1}>
              <Typography variant='subtitle2'>No Contact Found</Typography>
              <Button size='small' variant='outlined' color={'primary'}>
                Add Contact
              </Button>
            </Box>
          </Box>
        )
      }
    }
  },

  
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <IconButton component={Link} href={`/vendor/profile/${row.id}`}>
        <Icon icon='mdi:eye-outline' />
      </IconButton>
    )
  }
]

const VendorList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchData({
        role: '',
        q: value,
        status: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, value])

  const store = useSelector(state => state.vendor)
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
          {/* <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} /> */}
          {store.data.data && (
            <DataGrid
              autoHeight
              rowHeight={75}
              rows={store.data.data}
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

export default VendorList

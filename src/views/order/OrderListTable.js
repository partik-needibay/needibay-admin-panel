import { useEffect, useCallback, useState } from 'react'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
// ** Actions Imports
import { fetchData } from 'src/store/apps/service'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import Link from 'next/link'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import PageHeader from 'src/@core/components/page-header'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
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

const columns = [
  {
    flex: 0.2,
    minWidth: 25,
    width: 175,
    maxWidth: 175,
    field: 'vendor',
    headerName: 'Vendor Info',
    renderCell: ({ row }) => {
      const { categoryName } = row

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
              {categoryName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 25,
    width: 175,
    maxWidth: 175,
    field: 'orderId',
    headerName: 'Order Id',
    renderCell: ({ row }) => {
      const { categoryName } = row

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
              {categoryName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 175,
    field: 'customer',
    headerName: 'Customer Info',
    renderCell: ({ row }) => {
      const { serviceName } = row

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
              {serviceName}
            </Typography>
            {/* <Typography
                noWrap
                variant='body2'
                component={Link}
                href={`${email}`}
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {`@${email}`}
              </Typography> */}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'items',
    headerName: 'Order Item',
    renderCell: ({ row }) => {
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
              {row?.perHrCost}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }) => {
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
              {row?.rentalCost}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'payment',
    headerName: 'Payment Info',
    renderCell: ({ row }) => {
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
              {row?.tableReq}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'status',
    headerName: 'Order Status',
    renderCell: ({ row }) => {
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
              {row?.powerReq}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    padding: 5,
    field: 'actions',
    headerName: 'Actions',

    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            component={Link}
            href={``} // Adjust the edit link as needed
            color='primary'
            sx={{ padding: 0 }}
          >
            <Icon icon={userRoleObj.view.icon} />
          </IconButton>
          <IconButton
            component={Link}
            href={`/createproduct`} // Adjust the edit link as needed
            color='primary'
          >
            <Icon icon={userRoleObj.editor.icon} />
          </IconButton>
          <IconButton
            component={Link}
            href={``} // Adjust the edit link as needed
            color='primary'
          >
            <Icon icon={userRoleObj.delete.icon} />
          </IconButton>
        </Box>
      )
    }
  }
]
function OrderListTable({ headerName }) {
  const [pageSize, setPageSize] = useState(10)

  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>{headerName}</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='1' label='All Orders' />
              <Tab value='2' label='Processing' />
              <Tab value='3' label='Dispatched' />
              <Tab value='4' label='On the Way' />
              <Tab value='5' label='Delivered' />
            </TabList>
            <TabPanel value='1'>
              {store.data.data && (
                <DataGrid
                  autoHeight
                  rows={store.data.data}
                  columns={columns}
                  checkboxSelection
                  pageSize={pageSize}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                  sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                />
              )}
            </TabPanel>
            <TabPanel value='2'>
              <Typography>
                Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa
                chups sesame snaps halvah.
              </Typography>
            </TabPanel>
            <TabPanel value='3'>
              <Typography>
                Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie
                roll carrot cake gummi bears.
              </Typography>
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OrderListTable

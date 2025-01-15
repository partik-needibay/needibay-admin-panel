// ** React Imports
import { useEffect, useCallback, useState, useMemo } from 'react'

// ** Next Import
import Link from 'next/link'
import { format } from 'date-fns'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled, alpha } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MenuItem, Menu } from '@mui/material'
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
import { fetchData, updateOrderStatus } from 'src/store/apps/order'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import orderStatusList from 'src/data/orderStatusList'
import { toast } from 'react-toastify'

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

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

function OrderStatusMenu({ row, handleOrderStatusChange }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { orderStatus, id, incrementId } = row

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} key={incrementId}>
      <Button
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='outlined'
        size='small'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {orderStatusList.find(o => o.id == orderStatus?.id)?.label}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {orderStatusList
          .filter(o => o.status_type == '1' || o.status_type == '3')
          .map(status => {
            return (
              <MenuItem key={status?.id + incrementId} onClick={() => handleOrderStatusChange(status?.id, id)}>
                {status.status_type == 1 && <Typography>{`Processing - `}</Typography>}
                {status.status_type == 3 && <Typography>{`Delivery - `}</Typography>}
                {status.label}
              </MenuItem>
            )
          })}
      </StyledMenu>
    </Box>
  )
}

// ** renders client column

const OrderList = props => {
  const { plan, handlePlanChange, handleFilter } = props
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch()

  const store = useSelector(state => state.order.data)

  useEffect(() => {
    dispatch(fetchData({ page }))
  }, [dispatch, page])


  const handleClose = () => {
    /* const data = {
      orderId,
      orderStatus,
      comment:"test comment"
    }
    dispatch(updateOrderStatus(data))
    console.log(orderStatus) */
    // setAnchorEl(null)
  }

  // ** State
  const [value, setValue] = useState('1')

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= store.data?.totalPages) {
      setPage(newPage)
    } else {
      alert('No more pages to navigate')
    }
  }


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleOrderStatusChange = useCallback(
    (status, orderId, incrementId) => {
      const payload = {
        status: status,
        comment: '',
        orderId: orderId
      }
      dispatch(updateOrderStatus(payload))
        .then(response => {
          if (response.meta.requestStatus === 'fulfilled') {
            console.log(response)
            if (response?.payload?.success) {
              toast.success(response?.payload?.message, { theme: 'light' })
            } else {
              toast.error(response?.payload?.message, { theme: 'light' })
            }
          } else {
            toast.error('Something went wrong!', { theme: 'light' })
          }
        })
        .catch(error => {
          toast.error('Something went wrong!', { theme: 'light' })
        })
        .finally(() => {
          handleClose()
        })
    },
    [dispatch]
  )

  console.log(store.data?.content)

  const columns = useMemo(
    () => [
      {
        flex: 0.2,
        maxWidth: 125,
        field: 'id',
        headerName: 'OrderId',
        renderCell: ({ row }) => {
          const { incrementId, id } = row

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography
                  noWrap
                  component={Link}
                  variant='subtitle2'
                  href={`/order/${id}`}
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {incrementId}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        flex: 0.2,
        minWidth: 230,
        field: 'customerInfo',
        headerName: 'Customer Info',
        renderCell: ({ row }) => {
          const { customerEmail, customerPhone, customerFullName } = row

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
                  {customerFullName}
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
        flex: 0.2,
        minWidth: 230,
        field: 'orderAmount',
        headerName: 'Order Amount',
        renderCell: ({ row }) => {
          const { orderAmount } = row

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
                  {`Rs.${orderAmount}/-`}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        flex: 0.2,
        minWidth: 230,
        field: 'orderStatus',
        headerName: 'Order Status',
        renderCell: ({ row }) => {
          return <OrderStatusMenu row={row} handleOrderStatusChange={handleOrderStatusChange} />
        }
      },
      {
        flex: 0.2,
        minWidth: 230,
        field: 'createdAt',
        headerName: 'Order Received',
        renderCell: ({ row }) => {
          const { createdAt } = row

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
                  {format(new Date(createdAt), 'MMM dd, yyyy')}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 100,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: row => (
          <IconButton component={Link} href={`/order/${row.id}`}>
            <Icon icon='mdi:eye-outline' />
          </IconButton>
        )
      }
    ],
    [handleOrderStatusChange]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='1' label='All Orders' />
              <Tab value='2' label='Processing' />
              <Tab value='3' label='Dispatched' />
              <Tab value='4' label='On the Way' />
              <Tab value='5' label='Delivered' />
            </TabList>
            <TabPanel value='1'>
              {store && store.data?.content && (
                <DataGrid
                  autoHeight
                  rowHeight={75}
                  rows={store.data?.content}
                  pagination
                  columns={columns}
                  checkboxSelection
                  pageSize={pageSize}
                  rowCount={store.data?.totalElements}
                  paginationMode="server"
                  onPageChange={handlePageChange}
                  disableSelectionOnClick
                  rowsPerPageOptions={[10, 25, 50]}
                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                  sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                  components={{
                    Toolbar: GridToolbar
                  }}
                  componentsProps={{
                    toolbar: {
                      showQuickFilter: true
                    }
                  }}
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

export default OrderList

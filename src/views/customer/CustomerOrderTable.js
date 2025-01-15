import React, { useCallback, useState, useEffect } from 'react'

import { Grid, Box, Card, IconButton, Typography, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import TableHeader from 'src/views/apps/roles/TableHeader'
import Link from 'next/link'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { fetchData, updateOrderStatus } from 'src/store/apps/order'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import orderStatusList from 'src/data/orderStatusList'
import { styled, alpha } from '@mui/material/styles'
import { MenuItem, Menu } from '@mui/material'
import { format } from 'date-fns'

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

const CustomerOrderTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (orderStatus, row) => {
    console.log(orderStatus)
    console.log(row)
   /*  const data = {
      orderId,
      orderStatus,
      comment: 'test comment'
    }
    dispatch(updateOrderStatus(data))
    console.log(orderStatus) */
    setAnchorEl(null)
  }
  const orderColumns = [
    {
      flex: 1,
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
      flex: 1,

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
      flex: 1,

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
      flex: 1,

      field: 'orderStatus',
      headerName: 'Order Status',
      renderCell: ({ row }) => {
        const { orderStatus, id } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              id='demo-customized-button'
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
            <StyledMenu
              id='demo-customized-menu'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {orderStatusList
                .filter(o => o.status_type == '1' || o.status_type == '3')
                .map(status => {
                  return (
                    <MenuItem onClick={() => handleClose(status?.id, id)}>
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
    },
    {
      flex: 1,

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
      flex: 1,

      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: row => (
        <IconButton component={Link} href={`/order/${row.id}`}>
          <Icon icon='mdi:eye-outline' />
        </IconButton>
      )
    }
  ]
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // ** Hooks

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
              columns={orderColumns}
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

export default CustomerOrderTable

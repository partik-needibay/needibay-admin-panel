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

const CustomerContactInfo = ({ data }) => {
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
  const emailBooksColumns = [
    {
      flex: 1,
      field: 'email',
      headerName: 'email',
      renderCell: ({ row }) => {
       
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href={`#`}
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.email}
              </Typography>
            </Box>
          </Box>
        )
      }}
  ]
  const phoneBooksColumns = [
    {
      flex: 1,
      field: 'phone',
      headerName: 'phone',
      renderCell: ({ row }) => {
       
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component={Link}
                variant='subtitle2'
                href={`#`}
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.phone}
              </Typography>
            </Box>
          </Box>
        )
      }}
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
          {data?.emailBooks?.length > 0 && (
            <DataGrid
              autoHeight
              rowHeight={75}
              rows={data?.emailBooks}
              columns={emailBooksColumns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          {data?.phoneBooks?.length > 0 && (
            <DataGrid
              autoHeight
              rowHeight={75}
              rows={data?.phoneBooks}
              columns={phoneBooksColumns}
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

export default CustomerContactInfo

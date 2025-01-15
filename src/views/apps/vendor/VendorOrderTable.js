import React, { useCallback, useState, useEffect } from 'react'

import { Grid, Box, Card, IconButton, Typography } from '@mui/material'
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
import { fetchData } from 'src/store/apps/service'
const VendorOrderTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const columns = [
    {
      flex: 0.2,
      minWidth: 125,
      maxWidth: 325,
      field: '"OrderID',
      headerName: 'Order ID',
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
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 175,
      field: 'DatePlaced',
      headerName: 'Date Placed',
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
                {/* 30/11/2023 */}
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
      minWidth: 150,
      field: 'Products/Items',
      headerName: 'Products/Items',
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
                {row.tableReq}
                {/* 1/1/2024 */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'Amount',
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
                {row.tableReq}
                {/* xyz */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'Order Status',
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
                {row.tableReq}
                {/* xyz */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'QuantityOrdered',
      headerName: 'Quantity Ordered',
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
                {row.tableReq}
                {/* xyz */}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
    // {
    //     flex: 0.2,
    //     minWidth: 150,
    //     field: 'toggle',
    //     headerName: 'Enable/Disable',
    //     renderCell: ({ row }) => {
    //         return (
    //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                 <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
    //                     <FormControlLabel
    //                         sx={{
    //                             display: 'block',
    //                         }}
    //                         control={
    //                             <Switch
    //                                 checked={rowChecked[row.id] || false}
    //                                 onChange={() => handleToggle(row.id)}
    //                                 name={`toggle-${row.id}`}
    //                                 color="primary"
    //                             />
    //                         }
    //                     />

    //                 </Box>
    //             </Box>
    //         )
    //     }
    // },
  ]
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
      <Grid item xs={12}>
        <Card>
          {store.data.data && (
            <DataGrid
              autoHeight
              rows={[]}
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

export default VendorOrderTable

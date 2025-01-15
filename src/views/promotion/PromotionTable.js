import React, { useCallback, useState, useEffect } from 'react'
import { Grid, Box, Card, IconButton, Typography, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import TableHeader from 'src/views/apps/roles/TableHeader'
import Link from 'next/link'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { fetchData } from 'src/store/apps/coupon'
import PageHeader from 'src/@core/components/page-header'
import format from 'date-fns/format'

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const PromotionTable = ({ headerName }) => {
  const columns = [
    {
      flex: 1,
      field: 'couponCode',
      headerName: 'Coupon code',
      renderCell: ({ row }) => {
        const { couponCode } = row

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
                {couponCode}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'couponType',
      headerName: 'Coupon Type',
      renderCell: ({ row }) => {
        const { couponType } = row

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
                {couponType}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'percent',
      headerName: 'Percent',
      renderCell: ({ row }) => {
        const { percent } = row

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
                {percent}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'minOrderPrice',
      headerName: 'Min Order Price',
      renderCell: ({ row }) => {
        const { minOrderPrice } = row

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
                {minOrderPrice}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'maxDiscountAmt',
      headerName: 'Min Discount Amount',
      renderCell: ({ row }) => {
        const { maxDiscountAmt } = row

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
                {maxDiscountAmt}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'maxUsableQuantity',
      headerName: 'Min Usable Quantity',
      renderCell: ({ row }) => {
        const { maxUsableQuantity } = row

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
                {maxUsableQuantity}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }

    },
    {
      flex: 1,
      field: 'startsAt',
      headerName: 'Available From',
      renderCell: ({ row }) => {
        const { startsAt } = row

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
                {format(new Date(startsAt), 'do MMM yyyy')}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
      
    },
    {
      flex: 1,
      field: 'expiresAt',
      headerName: 'Expires At',
      renderCell: ({ row }) => {
        const { expiresAt } = row

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
                {format(new Date(expiresAt), 'do MMM yyyy')}
                {/* Invoice */}
              </Typography>
            </Box>
          </Box>
        )
      }
      
    },
    {
      flex: 1,
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
  const [pageSize, setPageSize] = useState(10)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  const store = useSelector(state => state.coupon)
  console.log(store.data?.data)

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
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>
          <Link href='/promotion/create'>
            <Button variant='contained'>Add New Promotion</Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
          {store && store.data?.data && (
            <DataGrid
              autoHeight
              rows={store.data?.data}
              columns={columns}
              checkboxSelection
              pageSize={pageSize}
              slots={{ toolbar: GridToolbar }}
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

export default PromotionTable

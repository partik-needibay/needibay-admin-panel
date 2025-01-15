import React, { useContext } from 'react'
import { useEffect, useCallback, useState } from 'react'

// ** MUI Imports
import Link from 'next/link'
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
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData, disableProductById } from 'src/store/apps/catelog'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Backdrop } from '@mui/material'
import FallbackSpinner from 'src/@core/components/spinner'
import { setProducts } from 'src/store/apps/order'

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const ProductSelectTable = ({ ...props }) => {
  const [pageSize, setPageSize] = useState(10)

  const { relatedProducts, checkboxSelection } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const store = useSelector(state => state.catalog)

  const ability = useContext(AbilityContext)

  const disableProduct = productId => {
    dispatch(disableProductById(productId))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log(response)
          if (response?.payload?.success) {
            dispatch(fetchData())
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
  }

  const columns = [
    {
      flex: 1,
      field: 'productName',
      headerName: 'Name',
      renderCell: ({ row }) => {
        const { productName } = row

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
                {productName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    /* {
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      field: 'isActive',
      headerName: 'Is Active',
      renderCell: ({ row }) => {
        const { isActive } = row

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
                {isActive ? "True" : "False"}
              </Typography>
            </Box>
          </Box>
        )
      }
    }, */
    {
      flex: 1,
      field: 'productType',
      headerName: 'Product Type',
      renderCell: ({ row }) => {
        const { productType } = row

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
                {productType}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 1,
      field: 'media',
      headerName: 'Image',
      renderCell: ({ row }) => {
        const { media } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
            <img
              src={media?.length > 0 && media[0]?.value ? media[0]?.value : ''}
              width={'125px'}
              height={'125px'}
              style={{ padding: '20px', borderRadius: '15px' }}
            />
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'basePrice',
      headerName: 'Price',
      renderCell: ({ row }) => {
        const { basePrice } = row

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
                {`Rs.${basePrice}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'baseCommission',
      headerName: 'commission',
      renderCell: ({ row }) => {
        const { baseCommission, baseCommissionType } = row

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
                {`${baseCommission} ${baseCommissionType}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      field: 'basePriceWithCommission',
      headerName: 'Price With Commission',
      renderCell: ({ row }) => {
        const { basePriceWithCommission } = row

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
                {`Rs.${basePriceWithCommission}/-`}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  ]
  const loader = useSelector(state => state.catalog?.loader)

  const getSubtotal = (data) => {
    let subtotal = 0.00;
    let taxAmount = 0.00;
    data.map(item => {
        subtotal += item.basePriceWithCommission;

        taxAmount += item.basePriceWithCommission * item.taxPercent/100
    })

    

    return {subtotal, taxAmount};
  }

  const getGrandTotal = (data) => {
    let subtotal = 0.00;
    return subtotal;
  }

  const handleProductSelect = data => {
    let productItems = []
    data.map(item => {
      productItems.push(store.data?.data?.find(o => o.id == item))
    })
    const subtotal = getSubtotal(productItems).subtotal;
    const taxAmount = getSubtotal(productItems).taxAmount;
    const grandTotal = subtotal + taxAmount;
    const payload = {
        items: JSON.stringify(productItems),
        subtotal: subtotal,
        taxAmount: taxAmount,
        grandTotal: grandTotal
    }
    console.log(payload);
    dispatch(setProducts(payload))
  }

  return (
    <Box>
      {loader && (
        <Backdrop
          open={true}
          sx={{
            zIndex: 5,
            height: '100vh',
            color: 'common.white',
            backgroundColor: 'action.disabledBackground'
          }}
        >
          <FallbackSpinner />
        </Backdrop>
      )}
      <ToastContainer />
      {store.data.data && (
        <DataGrid
          autoHeight
          rows={relatedProducts?.length > 0 ? relatedProducts : store.data.data}
          columns={columns}
          checkboxSelection
          pageSize={pageSize}
          components={{
            Toolbar: GridToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          onSelectionModelChange={handleProductSelect}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      )}
    </Box>
  )
}

export default ProductSelectTable

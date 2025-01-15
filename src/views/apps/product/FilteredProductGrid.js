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
import { fetchData, disableProductById, fetchOfferProduct } from 'src/store/apps/catelog'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Backdrop } from '@mui/material'
import FallbackSpinner from 'src/@core/components/spinner'

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

export const FilteredProductGrid = () => {
  const [pageSize, setPageSize] = useState(10)
  const dispatch = useDispatch()

  const ability = useContext(AbilityContext)

  useEffect(() => {
    dispatch(fetchOfferProduct())
  }, [])

  const store = useSelector(state => state.catalog)
  console.log(store.data?.data?.content)


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
      flex: 0.2,
      minWidth: 200,
      maxWidth: 250,
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
      flex: 0.2,
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
      flex: 0.2,
      minWidth: 200,
      maxWidth: 250,
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
      flex: 0.2,
      minWidth: 100,
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
      flex: 0.2,
      minWidth: 100,
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
      flex: 0.2,
      minWidth: 100,
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
      flex: 0.2,
      minWidth: 100,
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
            {/* <IconButton
              component={Link}
              href={``} // Adjust the edit link as needed
              color='primary'
              sx={{ padding: 0 }}
            >
              <Icon icon={userRoleObj.view.icon} />
            </IconButton> */}
            {ability?.can(['edit'], 'product') && (
              <>
                <IconButton
                  component={Link}
                  href={`/product/${row.id}`} // Adjust the edit link as needed
                  color='primary'
                  target='_blank'
                >
                  <Icon icon={userRoleObj.editor.icon} />
                </IconButton>
                <IconButton component={Button} onClick={() => disableProduct(row.id)} color='primary'>
                  <Icon icon={userRoleObj.delete.icon} />
                </IconButton>
              </>
            )}
          </Box>
        )
      }
    }
  ]
  const loader = useSelector(state => state.catalog?.loader)

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
      {store.data?.data?.content?.length > 0 && (
        <DataGrid
          autoHeight
          rows={store.data?.data?.content}
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
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      )}
    </Box>
  )
}

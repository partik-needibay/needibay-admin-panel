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
import { addRelatedProducts } from 'src/store/apps/service/category'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/catelog'

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

export const RelatedProductGrid = ({ ...props }) => {
  const [pageSize, setPageSize] = useState(10)

  const { relatedProducts, checkboxSelection } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const store = useSelector(state => state.catalog)

  const ability = useContext(AbilityContext)

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
 
  ]

  const handleSelectedAttrOption = data => {
    dispatch(addRelatedProducts(data))
  }

  return (
    <Box>
      {store.data.data && (
        <DataGrid
          autoHeight
          rows={relatedProducts?.length > 0 ? relatedProducts : store.data.data}
          columns={columns}
          checkboxSelection={checkboxSelection}
          onSelectionModelChange={ids => {
            const selectedIDs = new Set(ids)
            const selectedRowData = store?.data?.data?.filter(row => selectedIDs.has(row.id))
            handleSelectedAttrOption(selectedRowData)
          }}
          pagination={false}
          disableSelectionOnClick
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      )}
    </Box>
  )
}

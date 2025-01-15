import React from 'react'
import { Drawer } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'

import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Icon from 'src/@core/components/icon'
import { fetchData } from 'src/store/apps/service'
import ProductTable from 'src/views/apps/product/Table'
import RelatedProductListTable from './RelatedProductListTable'


const columns = [
  {
    flex: 0.2,
    minWidth: 25,
    maxWidth: 125,
    field: 'categoryName',
    headerName: 'Category',
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
    field: 'serviceName',
    headerName: 'Product',
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
    field: 'perHrCost',
    headerName: 'Per Hour Cost',
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
              {row.perHrCost}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'rentalCost',
    headerName: 'Rental Cost',
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
              {row.rentalCost}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'tableReq',
    headerName: 'Table Req',
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
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'powerReq',
    headerName: 'Power Req',
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
              {row.powerReq}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 125,
    field: 'participantCount',
    headerName: 'Participant Count',
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
              {row.participantCount}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 230,
    field: 'serviceDescription',
    headerName: 'Description',
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
              {row.serviceDescription}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 105,
    field: 'isActive',
    headerName: 'Is Active',
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
              {row.isActive}
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

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  delete: { icon: 'mdi:delete-outline', color: 'info.main' },
  view: { icon: 'lets-icons:view', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const RelatedProductDrawer = props => {
  const [pageSize, setPageSize] = useState(10)
  const [value, setValue] = useState('1')
  const dispatch = useDispatch()

  const [ selectedProducts, setSelectedProducts ] = useState([])

  const [rowSelectionModel, setRowSelectionModel] = useState([])

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const store = useSelector(state => state.service)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { open, toggle, listRelatedProducts} = props

  const checkRowSelections = () => {
    listRelatedProducts(store.data.data.filter(item => rowSelectionModel.includes(item.id)))
    handleClose()
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <Drawer
      variant='temporary'
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '75%', sm: '75%', md: '75%', lg: '75%', xl: '85%' } } }}
      anchor='right'
      open={open}
      onClose={handleClose}
    >
      <Box sx={{}}>
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ px: 3, py: 2, mb: 5, mt: 3 }}>
          <Typography variant='h5'>Add Related Products</Typography>
          <Box>

            <Button sx={{ mr: 2 }} variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={checkRowSelections}>Save Selection</Button>
          </Box>
        </Box>
        <RelatedProductListTable />
        {/* {store.data.data && (
          <DataGrid
            autoHeight={true}
            rows={store.data.data}
            onSelectionModelChange={newSelection => {
              setRowSelectionModel(newSelection)
            }}

            rowSelectionModel={rowSelectionModel} 
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        )} */}
      </Box>
    </Drawer>
  )
}

export default RelatedProductDrawer

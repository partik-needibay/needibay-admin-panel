// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { ProductGrid } from './ProductGrid'

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
import { fetchData, fetchOfferProduct } from 'src/store/apps/catelog/index'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'
import { FilteredProductGrid } from './FilteredProductGrid'
import { DisabledProductGrid } from './DisabledProductGrid'

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

const ProductListTable = ({ ...props }) => {
  const [pageSize, setPageSize] = useState(10)

  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchOfferProduct())
  }, [dispatchEvent])

  const store = useSelector(state => state.catalog)

  const handleFilter = useCallback(val => {}, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='simple tabs example'>
              <Tab value='1' label='All Products' />
              <Tab value='2' label='Enabled' />
              <Tab value='3' label='Draft' />
              <Tab value='4' label='Disabled' />
              <Tab value='5' label='With Offer' />
            </TabList>
            <TabPanel value='1'>
              <Box py={4}>
                <ProductGrid relatedProducts={store.data?.data} />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Box py={4}>
                <FilteredProductGrid />
              </Box>
            </TabPanel>
            <TabPanel value='3'>
              <Typography></Typography>
            </TabPanel>
            <TabPanel value='4'>
              <DisabledProductGrid/>
            </TabPanel>
            <TabPanel value='5'>
              <Box py={4}>
                <FilteredProductGrid />
              </Box>
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProductListTable

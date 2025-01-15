// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchDataById } from 'src/store/apps/vendor'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import VendorPayment from 'src/views/apps/vendor/view/VendorPayment'
import UserViewOverview from 'src/views/apps/user/view/UserViewOverview'
import UserViewSecurity from 'src/views/apps/user/view/UserViewSecurity'
import UserViewConnection from 'src/views/apps/user/view/UserViewConnection'
import EventCard from './EventCard'
import { useSelector, useDispatch } from 'react-redux'
import VendorServiceTable from './VendorServiceTable'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const UserViewRight = ({ tab, id, invoiceData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(true)
  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/apps/vendor/view/${id}/${value.toLowerCase()}`
      })
      .then(() => setIsLoading(false))
  }

  useEffect(() => {
    dispatch(fetchDataById({ id }))
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
  }, [tab, dispatch])

  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false)
    }
  }, [invoiceData])

  const store = useSelector(state => state.vendor.data)

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='overview' label='Overview' icon={<Icon icon='mdi:account-outline' />} />
        <Tab value='services' label='Services' icon={<Icon icon='mdi:lock-outline' />} />
        <Tab value='payments' label='Payments' icon={<Icon icon='mdi:bookmark-outline' />} />
        <Tab value='Events' label='events' icon={<Icon icon='mdi:bell-outline' />} />
        <Tab value='connection' label='Connection' icon={<Icon icon='mdi:link-variant' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='overview'>
              <UserViewOverview invoiceData={invoiceData} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='services'>
              <VendorServiceTable data={store} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='payments'>
              <VendorPayment />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='events'>
              <EventCard />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='connection'>
              <UserViewConnection />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default UserViewRight

import React, { useState, useEffect } from 'react'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Icon from 'src/@core/components/icon'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import VendorOverView from './VendorOverView'
import VendorOrderTable from './VendorOrderTable'
import VendorPaymentInfo from './VendorPaymentInfo'
import KycDetails from './KycDetails'
import ContactDetailsTable from './ContactDetailsTable'
import { fetchVendorDataByVendorId } from 'src/store/apps/vendor'
import { useDispatch, useSelector } from 'react-redux'
import Documents from 'src/views/pages/contact/create-contact/Documents'
import DocumentsTable from './DocumentsTable'

const VendorViewRight = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(0)
  const router = useRouter()
  const dispatch = useDispatch()

  const Tab = styled(MuiTab)(({ theme }) => ({
    minHeight: 48,
    flexDirection: 'row',
    '& svg': {
      marginBottom: '0 !important',
      marginRight: theme.spacing(1)
    }
  }))
  const handleChange = (event, newValue) => {
    setIsLoading(true)
    setValue(newValue)
  }
  useEffect(() => {
    dispatch(fetchVendorDataByVendorId(id))
  }, [dispatch, id])
  const data = useSelector(store => store.vendor?.vendorData)

  return (
    <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value={0} label='Overview' icon={<Icon icon='mdi:account-outline' />} />
        <Tab value={1} label='Purchase Order' icon={<Icon icon='mdi:lock-outline' />} />
        <Tab value={2} label='Payment Info' icon={<Icon icon='mdi:bell-outline' />} />
        <Tab value={3} label='Documents' icon={<Icon icon='mdi:link-variant' />} />
        <Tab value={4} label='Contacts' icon={<Icon icon='mdi:bookmark-outline' />} />
      </TabList>
      <>
        {/* overview,order,payment,kyc details(accordian):= 2nd acc table, bank simple, */}
        <TabPanel value={0}>
          <VendorOverView />
        </TabPanel>
        <TabPanel value={1}>
          <VendorOrderTable />
        </TabPanel>
        <TabPanel value={2}>
          <VendorPaymentInfo />
        </TabPanel>
        <TabPanel value={3}>
          <DocumentsTable data={data?.data} />
        </TabPanel>
        <TabPanel value={4}>
          <ContactDetailsTable data={data?.data} />
        </TabPanel>
      </>
    </TabContext>
  )
}

export default VendorViewRight

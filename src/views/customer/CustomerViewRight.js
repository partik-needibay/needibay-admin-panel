import React, { useState, useEffect } from 'react'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Icon from 'src/@core/components/icon'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import CustomerOrderTable from './CustomerOrderTable'
import CustomerAddressTable from './CustomerAddressTable'
import CustomerPaymentInfo from './CustomerPaymentInfo'
import CustomerTicketInfo from './CustomerTicketInfo'
import CustomerOverView from './CustomerOverView'
import { fetchCustomerOrderByCustomerId, fetchCustomerDataByCustomerId, fetchCustomerAddressByCustomerId, fetchCustomerPaymentByCustomerId } from 'src/store/apps/customer'
import { useDispatch, useSelector } from 'react-redux'
import OrderListTable from '../order/OrderListTable'
import CustomerContactInfo from './CustomerContactInfo'

const CustomerViewRight = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const router = useRouter()
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
        setValue(newValue);
    }
    useEffect(() => {
        dispatch(fetchCustomerOrderByCustomerId(id))
        dispatch(fetchCustomerAddressByCustomerId(id))
        dispatch(fetchCustomerPaymentByCustomerId(id))
        dispatch(fetchCustomerDataByCustomerId(id))
    }, [])

    const customerOrder = useSelector(store => store?.customer?.customerOrder)
    const customerAddress = useSelector(store => store?.customer?.customerAddress)
    const customerPayment = useSelector(store => store?.customer?.customerPayment)
    const customerData = useSelector(store => store?.customer?.customerData?.data)

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
                <Tab value={1} label='Order' icon={<Icon icon='mdi:lock-outline' />} />
                <Tab value={2} label='address' icon={<Icon icon='mdi:bookmark-outline' />} />
                <Tab value={3} label='Payment Info' icon={<Icon icon='mdi:bell-outline' />} />
                <Tab value={4} label='Contacts Info' icon={<Icon icon='mdi:bell-outline' />} />
            </TabList>
            <>
                <TabPanel value={0}><CustomerOverView /></TabPanel>
                <TabPanel value={1}><CustomerOrderTable data={customerOrder?.data?.content} /></TabPanel>
                <TabPanel value={2}><CustomerAddressTable addresses={customerAddress?.data} /></TabPanel>
                <TabPanel value={3}><CustomerPaymentInfo data={customerPayment?.data} /></TabPanel>
                <TabPanel value={4}><CustomerContactInfo data={customerData} /></TabPanel>
            </>
        </TabContext >
    )
}

export default CustomerViewRight
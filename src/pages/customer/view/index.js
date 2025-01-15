import { Grid, Typography, Box, Button } from '@mui/material'
import React, { useState, useContext } from 'react'
import PageHeader from 'src/@core/components/page-header'
import CustomerTable from 'src/views/customer/view/CustomerTable'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import AddCustomerDrawer from 'src/views/apps/customer/AddCustomerDrawer'

function CustomerList() {
  const ability = useContext(AbilityContext)
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const toggleCustomerDrawer = () => setAddCustomerOpen(!addCustomerOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>Customer</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>{ability?.can(['add'], 'customer') && <Button variant='contained' onClick={() => setAddCustomerOpen(true)}>Add New Customer</Button>}</Box>
      </Grid>
      <Grid item xs={12}>
        <CustomerTable />
      </Grid>
      <AddCustomerDrawer open={addCustomerOpen} toggle={toggleCustomerDrawer} />
    </Grid>
  )
}

CustomerList.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default CustomerList

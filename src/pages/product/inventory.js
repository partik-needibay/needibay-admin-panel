import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import PageHeader from 'src/@core/components/page-header'
import OrderTable from 'src/views/apps/order/Table'
import InventroyTable from 'src/views/product/InventroyTable'

const Inventory = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} lg={9}>
                <PageHeader
                    title={<Typography variant='h5'>Inventory</Typography>}
                    subtitle={<Typography variant='body2'></Typography>}
                />
            </Grid>
            {/* <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
          <Box>
            <Link href='/order/create'>
              <Button variant='contained'>Create New Order</Button>
            </Link>
          </Box>
        </Grid> */}
            <Grid item xs={12}>
                <InventroyTable />
            </Grid>
        </Grid>
    )
}

export default Inventory
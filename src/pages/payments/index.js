// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import PaymentTable from 'src/views/apps/payment/Table'

const PaymentList = props => {
  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>All Payment</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>
          <Link href='/vendor/create'>
            <Button variant='contained'>New Payment Request</Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <PaymentTable />
      </Grid>
    </Grid>
  )
}

export default PaymentList

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import InvoiceTable from 'src/views/apps/invoice/Table'

const InvoiceList = props => {
  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>All Invoice</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>
          <Link href='/apps/invoice/add/'>
            <Button variant='contained'>Add New Invoice</Button>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <InvoiceTable />
      </Grid>
    </Grid>
  )
}

export default InvoiceList

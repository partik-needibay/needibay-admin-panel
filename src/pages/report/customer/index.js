// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import QuotationTable from 'src/views/apps/quotation/Table'

const CustomerReportIndex = props => {
  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Customer Reports</Typography>}
        subtitle={<Typography variant='body2'>Find all customer report</Typography>}
      />
      <Grid item xs={12}>
        <QuotationTable />
      </Grid>
    </Grid>
  )
}

export default CustomerReportIndex

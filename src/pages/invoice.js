// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import LeadTable from 'src/views/apps/lead/Table'

const InvoiceComponent = props => {
  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Total leads from all the channels</Typography>}
        subtitle={
          <Typography variant='body2'>
            Find all the inboud leads from all the integrated channel with source name.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <LeadTable />
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps({ req }) {
  const res = await fetch(`http://localhost:8083/department`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const apiData = await res.json()
  console.log(apiData)
  return { props: { data: apiData } }
}

export default InvoiceComponent

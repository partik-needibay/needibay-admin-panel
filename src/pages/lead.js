import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import LeadTable from 'src/views/apps/lead/Table'
import AddLeadDrawer from 'src/views/apps/lead/AddLeadDrawer'

const LeadComponent = props => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>Total leads from all the channels</Typography>}
          subtitle={
            <Typography variant='body2'>
              Find all the inboud leads from all the integrated channel with source name.
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>
          <Button variant='contained' onClick={() => setAddUserOpen(true)}>
            Add New Lead
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <LeadTable />
      </Grid>
      <AddLeadDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default LeadComponent

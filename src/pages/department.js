// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import DepartmentCards from 'src/views/apps/departments/DepartmentCards'

const DepartmentComponent = props => {
  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Department List</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <DepartmentCards data={departmentData} />
      </Grid>
      <PageHeader
        title={<Typography variant='h5'>Total users with their department</Typography>}
        subtitle={
          <Typography variant='body2'>
            Find all of your company’s administrator accounts and their associate department.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Table />
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

export default DepartmentComponent

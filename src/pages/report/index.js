// ** MUI Imports
import { Icon } from '@iconify/react'
import { Typography, Grid, Box, CardContent, Card } from '@mui/material'
import Link from 'next/link'

const ReportIndexPage = props => {
  const departmentData = props.data
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <Box component={Link} href={"/report/product"} display={"flex"} justifyContent={"center"}>
          <Card sx={{ width: 175, height: 175, display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{}}><Icon icon="fluent-mdl2:product-variant" width={75} color={"primary"} /></CardContent>
            <Typography variant='subtitle'>Product Reports</Typography>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Box component={Link} href={"/report/customer"} display={"flex"} justifyContent={"center"}>
          <Card sx={{ width: 175, height: 175, display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{}}><Icon icon="fa-solid:users" width={75} color={"primary"} /></CardContent>
            <Typography variant='subtitle'>Customer Reports</Typography>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Box component={Link} href={"/report/order"} display={"flex"} justifyContent={"center"}>
          <Card sx={{ width: 175, height: 175, display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{}}><Icon icon="fluent-mdl2:activate-orders" width={75} color={"primary.main"} /></CardContent>
            <Typography variant='subtitle'>Order Reports</Typography>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ReportIndexPage

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import ProductTable from 'src/views/apps/product/Table'
import ProductFilter from 'src/pages/product/productFilter'
import { useState, useContext } from 'react'
import { AbilityContext  } from 'src/layouts/components/acl/Can'

const ProductList = props => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const ability = useContext(AbilityContext)

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter)
  }

  const departmentData = props.data
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={9}>
        <PageHeader
          title={<Typography variant='h5'>Product</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
        <Box>
          {ability?.can(['add'], 'product') && (
            <Link href='/product/create'>
              <Button variant='contained'>Add New Product</Button>
            </Link>
          )}
        </Box>
      </Grid>
      <Grid item xs={toggleFilter ? 7 : 12} xl={toggleFilter ? 9 : 12}>
        <ProductTable handleToggleFilter={handleToggleFilter} />
      </Grid>
      <Grid item xs={5} xl={3}>
        {toggleFilter && <ProductFilter />}
      </Grid>
    </Grid>
  )
}
ProductList.acl = {
  action: 'read',
  subject: 'acl-page'
}
export default ProductList

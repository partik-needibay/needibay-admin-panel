import React from 'react'
import Grid from '@mui/material/Grid'
import VendorViewLeft from 'src/views/apps/vendor/VendorViewLeft'
import VendorViewRight from 'src/views/apps/vendor/VendorViewRight'
const profile = ({id}) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={5} lg={4}>
                <VendorViewLeft id={id} />
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <VendorViewRight id={id} />
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = async context => {
    console.log(context.params.id)
    return {
      props: {
        id: context.params.id
      }
    }
  }

export default profile
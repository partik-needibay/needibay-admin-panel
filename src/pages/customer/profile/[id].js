import React from 'react'
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import Grid from '@mui/material/Grid'
import CustomerViewLeft from 'src/views/customer/CustomerViewLeft'
import CustomerViewRight from 'src/views/customer/CustomerViewRight'
const profile = ({id}) => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={5} lg={4}>
                <CustomerViewLeft id={id} />
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <CustomerViewRight id={id} />
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
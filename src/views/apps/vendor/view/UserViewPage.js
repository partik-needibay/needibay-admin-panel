// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/vendor/view/UserViewLeft'
import UserViewRight from 'src/views/apps/vendor/view/UserViewRight'
import { fetchDataById } from 'src/store/apps/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserView = ({ tab, id, invoiceData }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataById({ id }))
  }, [dispatch])

  const store = useSelector(state => state.vendor.data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        {store && store.data && <UserViewLeft data={store} />}
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} id={id} data={store} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserView

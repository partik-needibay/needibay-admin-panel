import { Grid, Box, Typography, Card, Avatar, Button, ListItem, CardContent, CardHeader, Drawer } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import PageHeader from 'src/@core/components/page-header'
import Icon from 'src/@core/components/icon'
import { fetchData, fetchOrderById } from 'src/store/apps/order'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { lighten, useTheme } from '@mui/material/styles'
import TaskCard from 'src/views/components/card/TaskCard'
import SimpleTable from 'src/views/components/table/SimpleTable'
import { languages } from 'prismjs'
import EventOverview from 'src/views/pages/event/EventOverview'
import OrderOverview from 'src/views/pages/order/OrderOverview'
import { paddingBottom } from 'styled-system'
import LeadList from 'src/views/apps/lead/Table'
import OrderItemTable from 'src/views/apps/order/OrderItemTable'
import { useRouter } from 'next/router'


const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    background: 'white',
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24),
      padding: '1.5rem'
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const leftColWidth = '350px'

const styles = {
  container: {
    height: '100vh'
  },
  leftColumn: {
    height: '100%',
    position: 'fixed',
    overflow: 'scroll',
    paddingBottom: "100px",
    width: leftColWidth
  },
  rightColumn: {
    height: '100%',
    marginLeft: leftColWidth
  }
}

const OrderById = ({ id }) => {
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const theme = useTheme()
  const router = useRouter()

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchOrderById(id))
  }, [dispatch, id])

  const store = useSelector(state => state.order.data)
  const orderById = useSelector(state => state.order.orderById)

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid item lg={3} sx={styles.leftColumn} style={{scrollbarWidth: "0px"}}>
        <Card>
          <StyledList>
            {store.data &&
              store.data?.content.map(item => {
                return (
                  <Link href={`/order/${item.id}`} style={{ textDecoration: 'none' }}>
                    <ListItem
                      sx={
                        id == item.id
                          ? {
                              borderColor: lighten(theme.palette['info'].light, 0.88),
                              border: '2px',
                              borderRadius: "5px",
                              borderStyle: "solid",
                              flexDirection: 'column',
                              alignItems: 'baseline',
                              cursor: 'pointer'
                            }
                          : { cursor: 'pointer', border: '2px', flexDirection: 'column', alignItems: 'baseline' }
                      }
                    >
                      {/* <ListItemAvatar>
                        <Avatar
                          src='/materialize-nextjs-admin-template/demo-1/images/avatars/2.png'
                          alt='Caroline Black'
                        />
                      </ListItemAvatar> */}
                      <Typography variant='subtitle2'>{`Order Id: ${item.incrementId}`}</Typography>
                      <ListItemText primary={`${item.customerFullName}`} />

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}
                        justifyContent={'space-between'}
                        mt={2}
                      >
                        <CustomChip
                          skin='light'
                          size='small'
                          label={item.isActive && 'Order Status: Active'}
                          color={item.isActive && 'success'}
                          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
                        />
                        {item.orderStatus && (
                          <CustomChip
                            skin='light'
                            size='small'
                            label={item.orderStatus && item.orderStatus.status}
                            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
                          />
                        )}
                        {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                            {item.orderStatu}
                          </Typography> */}
                      </Box>
                    </ListItem>
                  </Link>
                )
              })}
          </StyledList>
        </Card>
      </Grid>
      <Grid item lg={9} sx={styles.rightColumn}>
        <Card>
          <Box m={4}>
            <PageHeader
              title={
                <Typography variant='h6'>
                  Order ID: #{`${orderById?.data?.incrementId}`}
                </Typography>
              }
              subtitle={<Typography variant='body2'>Order Details</Typography>}
            />
          </Box>
          <Box m={4}>
            {orderById?.data &&
               <OrderOverview data={orderById} />
            }
           
          </Box>
        </Card>
        <Box mt={2}><OrderItemTable data={orderById?.data?.salesOrderItem}  /></Box>
        <Box mt={4}></Box>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async context => {
  return {
    props: {
      id: context.params.id
    }
  }
}
/* export const getServerSideProps = async context => {
  console.log(context.req)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/${context.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    }
  })
  const apiData = await res.json()
  return { props: { data: apiData } }
}
 */
export default OrderById

import { Grid, Box, Typography, Card, Avatar, Button, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import PageHeader from 'src/@core/components/page-header'
import Icon from 'src/@core/components/icon'
import BiddingOverview from 'src/views/pages/bidding/BiddingOverview'
import { fetchData } from 'src/store/apps/lead'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { lighten, useTheme } from '@mui/material/styles'
import QuotationList from '../apps/invoice/list'

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

const InvoiceById = ({ id }) => {
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const theme = useTheme()

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchData({
        role: '',
        q: value,
        status: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, value])

  const store = useSelector(state => state.lead)
  console.log(store)

  return (
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <Box mb={2}>
          <PageHeader
            title={<Typography variant='h5'>Bidding Real Time Metrics</Typography>}
            subtitle={<Typography variant='body2'>Track biddings against the product</Typography>}
          />
        </Box>
      </Grid>
      <Grid item lg={3}>
        <Card>
          <StyledList disablePadding>
            {store.data &&
              store.data.map(item => {
                return (
                  <Link href={`/bidding/${item.id}`} style={{ textDecoration: 'none' }}>
                    <ListItem
                      sx={
                        id == item.id
                          ? { backgroundColor: lighten(theme.palette['primary'].main, 0.88), cursor: 'pointer' }
                          : { cursor: 'pointer' }
                      }
                    >
                      {/* <ListItemAvatar>
                        <Avatar
                          src='/materialize-nextjs-admin-template/demo-1/images/avatars/2.png'
                          alt='Caroline Black'
                        />
                      </ListItemAvatar> */}
                      <div>
                        <ListItemText primary={`#${('000000000' + item.id).substring(4)}`} />
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Box
                            sx={{
                              mr: 3,
                              display: 'flex',
                              alignItems: 'center',
                              '& svg': { mr: 1, color: 'success.main' }
                            }}
                          >
                            <Icon icon='mdi:circle' fontSize='0.625rem' />
                            <Typography variant='caption'>{item.status.status}</Typography>
                          </Box>
                          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                            13 minutes ago
                          </Typography>
                        </Box>
                      </div>
                      <ListItemSecondaryAction>
                        <Typography variant='body'>{`${('0000000' + parseInt(item.quotations.length)).substring(
                          5
                        )} Bid`}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                )
              })}
          </StyledList>
        </Card>
      </Grid>
      <Grid item lg={9}>
        <Card>
          <Box m={4}>
            <PageHeader
              title={<Typography variant='h6'>Request Id: #{`${('000000000' + id).substring(4)}`}</Typography>}
              subtitle={<Typography variant='body2'>Track biddings against the product</Typography>}
            />
          </Box>
          <Box m={4}>
            <BiddingOverview data={store.data.filter(ele => ele.id == id)} />
          </Box>
        </Card>
        <Box mt={2}>{/* <LeadList /> */}</Box>
        <Box mt={2}>
          <QuotationList />
        </Box>
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

export default InvoiceById

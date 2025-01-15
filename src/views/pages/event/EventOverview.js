// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import CustomChip from 'src/@core/components/mui/chip'
import format from 'date-fns/format'
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

const salesData = [
  {
    stats: '43',
    color: 'primary',
    title: 'Total Bidding Count',
    icon: 'mdi:account-outline'
  },
  {
    stats: '$28.5k',
    color: 'success',
    icon: 'mdi:poll',
    title: 'Winning Bid'
  },
  {
    color: 'info',
    stats: '1,20,000',
    title: 'Open Bid',
    icon: 'mdi:trending-up'
  },
  {
    color: 'info',
    stats: '75,000',
    title: 'Close Bid Price',
    icon: 'mdi:trending-up'
  },
  {
    color: 'info',
    stats: '25 hrs',
    title: 'Time Left',
    icon: 'mdi:trending-up'
  },
  {
    color: 'info',
    stats: '3',
    title: 'Rebidding Count',
    icon: 'mdi:trending-up'
  }
]

const ProductData = [
  {
    stats: '10,000',
    color: 'primary',
    title: 'Papper Tape',
    icon: 'mdi:account-outline'
  },
  {
    stats: '15,000',
    color: 'success',
    icon: 'mdi:poll',
    title: 'Wooden Box'
  }
]

const renderStats = data => {
  return (
    <>
      {data && (
        <>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                <Icon icon={'material-symbols:10k-outline'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {`Rs.${parseInt(data.orders[0].orderAmount)}/-`}
                </Typography>
                <Typography variant='caption'>{'Order Payment'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'success'} sx={{ mr: 4 }}>
                <Icon icon={'tabler:currency-rupee'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {data.staffs.length}
                </Typography>
                <Typography variant='caption'>{'Staff Count'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'info'} sx={{ mr: 4 }}>
                <Icon icon={'mdi:graph-line-variant'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {/* {data.quotations[0].biddingStartedAt} */}
                </Typography>
                <Typography variant='caption'>{'Tasks Count'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'info'} sx={{ mr: 4 }}>
                <Icon icon={'mdi:graph-line-variant'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {/* {data.quotations[0].biddingStartedAt} */}
                </Typography>
                <Typography variant='caption'>{'Tasks Progress'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                <Icon icon={'material-symbols:10k-outline'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }} color={'red'}>
                  {`Rs.${parseInt(data.orders[0].salesOrderPayments[0].dueAmount)}/-`}
                </Typography>
                <Typography variant='caption' color={'red'}>
                  {'Due Amount'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                <Icon icon={'material-symbols:10k-outline'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {`Rs.${parseInt(data.orders[0].salesOrderPayments[0].paidAmount)}/-`}
                </Typography>
                <Typography variant='caption' color={'green'}>
                  {'Paid Amount'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </>
  )
}

const renderProductDetails = data => {
  return (
    <>
      {data && (
        <>
          {data.map((sale, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }} m={3}>
                <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                  <Icon icon={'fluent-mdl2:product-variant'} />
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {sale.eventService.serviceName}
                  </Typography>
                  <Typography variant='subtitle2' color={'green'}>
                    {' '}
                    {`Rental Cost Rs.${sale.eventService.rentalCost}/-`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </>
      )}
    </>
  )
}

const renderCustomerDetails = data => {
  return (
    <TableContainer>
      {data && (
        <Table>
          <TableBody
            sx={{
              '& .MuiTableCell-root': {
                borderBottom: 0,
                verticalAlign: 'top',
                '&:last-of-type': { px: '0 !important' },
                '&:first-of-type': { pl: '0 !important' },
                py: theme => `${theme.spacing(1)} !important`
              }
            }}
          >
            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'text.secondary' }}>{data.orders[0].customerFullName}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {data.orders[0].customerEmail}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'text.secondary' }}> {data.orders[0].customerPhone}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

const EventOverview = props => {
  //todo fix the error on page refresh
  useEffect(() => {})
  return (
    <>
      {props.data[0].orders.length > 0 ? (
        <>
          <Card elevation={0}>
            <CardHeader
              title='Order Overview'
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <OptionsMenu
                  options={['Refresh', 'Share', 'Update']}
                  iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
                />
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                {props.data[0].orders.length > 0 ? (
                  renderStats(props.data[0])
                ) : (
                  <Typography>No Order Associated with this Event</Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
          <Card elevation={0}>
            <CardHeader
              title='Services Included'
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <OptionsMenu
                  options={['Refresh', 'Share', 'Update']}
                  iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
                />
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                {props.data[0].orders.length > 0 ? (
                  renderProductDetails(props.data[0].orders[0].salesOrderItem)
                ) : (
                  <Typography>No Order Associated with this Event</Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
          <Card elevation={0}>
            <CardHeader
              title='Customer Info'
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <OptionsMenu
                  options={['Refresh', 'Share', 'Update']}
                  iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
                />
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item lg={12}>
                  {props.data[0].orders.length > 0 ? (
                    renderCustomerDetails(props.data[0])
                  ) : (
                    <Typography>No Order Associated with this Event</Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card variant='outlined' sx={{ color: 'primary' }}>
          <CardHeader
            title='Please add a order to this event'
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <OptionsMenu
                options={['Refresh', 'Share', 'Update']}
                iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
              />
            }
          />
        </Card>
      )}
    </>
  )
}

export default EventOverview

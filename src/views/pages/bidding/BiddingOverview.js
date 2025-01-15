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
                  {parseInt(data.quotations.length)}
                </Typography>
                <Typography variant='caption'>{'Total Bidding Count'}</Typography>
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
                  {/* {data.quotations[0].quoteTotal} */}
                </Typography>
                <Typography variant='caption'>{'Bid Started At'}</Typography>
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
                <Typography variant='caption'>{'Bidding Started At'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'error'} sx={{ mr: 4 }}>
                <Icon icon={'bi:dash-circle-fill'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {/* {data.quotations[0].expirationDate} */}
                </Typography>
                <Typography variant='caption'>{'Bidding End At'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={3}>
              <CustomAvatar skin='light' variant='rounded' color={'warning'} sx={{ mr: 4 }}>
                <Icon icon={'material-symbols:lock-clock-outline'} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {'On Going'}
                </Typography>
                <Typography variant='caption'>{'Is Price Locked'}</Typography>
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
          {data.quotations[0] &&
            data.quotations[0].quoteItems.map((sale, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }} m={3}>
                  <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                    <Icon icon={'fluent-mdl2:product-variant'} />
                  </CustomAvatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                      {sale.quantity}
                    </Typography>
                    <Typography variant='h6'>{sale.product.productName}</Typography>
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
                <Typography sx={{ color: 'text.secondary' }}>{data.fullName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Requested Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'text.secondary' }}>Yesterday</Typography>
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
                  {data.email}
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
                <Typography sx={{ color: 'text.secondary' }}>{data.phone}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Message
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'text.secondary' }}>{data.message}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Quote History
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'text.secondary' }}>12</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

const BiddingOverview = props => {
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          title='Bidding Overview'
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
            {renderStats(props.data[0])}
          </Grid>
        </CardContent>
      </Card>
      <Card elevation={0}>
        <CardHeader
          title='Enquired Products'
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
            {/* {renderProductDetails(props.data[0])} */}
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
              {renderCustomerDetails(props.data[0])}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default BiddingOverview

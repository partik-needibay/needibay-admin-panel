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
                  {`Rs.${parseInt(data?.grandTotal)}/-`}
                </Typography>
                <Typography variant='caption'>{'Grand Total'}</Typography>
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
                  {`Rs.${parseInt(data?.subtotal)}/-`}
                </Typography>
                <Typography variant='caption'>
                  {'Subtotal Amount'}
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
                  {data?.subtotalWithDiscount ? `${parseInt(data?.subtotalWithDiscount)}` : "No Discount Applied"}
                </Typography>
                <Typography variant='caption'>
                  {'Subtotal With Discount'}
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
                  {/* {`Rs.${parseInt(data?.salesOrderPayments[0].paidAmount)}/-`} */}
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
          {data?.map((sale, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }} m={3}>
                <CustomAvatar skin='light' variant='rounded' color={'primary'} sx={{ mr: 4 }}>
                  <Icon icon={'fluent-mdl2:product-variant'} />
                </CustomAvatar>
                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {sale.eventService.serviceName}
                  </Typography>
                  <Typography variant='subtitle2' color={'green'}>
                    {' '}
                    {`Rental Cost Rs.${sale.eventService.rentalCost}/-`}
                  </Typography>
                </Box> */}
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
                <Typography sx={{ color: 'text.secondary' }}>{data?.customerFullName}</Typography>
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
                  {data?.customerEmail}
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
                <Typography sx={{ color: 'text.secondary' }}> {data?.customerPhone}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

const renderAddress = data => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box width={'100%'} display='flex' flexDirection={'column'}>
          <Box pb={1}>
            <Typography variant='subtitle1'>Shipping Address</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>{data?.shippingAddressDetails?.addressLineOne}</Typography>
            <Typography variant='subtitle2'>{data?.shippingAddressDetails?.addressLineTwo}</Typography>
            <Typography variant='subtitle2'>{`Landmark : ${data?.shippingAddressDetails?.landmark}`}</Typography>
            <Typography variant='subtitle2'>{`Contact Person Name: ${data?.shippingAddressDetails?.contactPerson}`}</Typography>
            <Typography variant='subtitle2'>{`Contact Person Phone: ${data?.shippingAddressDetails?.phone}`}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Box width={'100%'} display='flex' flexDirection={'column'}>
          <Box pb={1}>
            <Typography variant='subtitle1'>Billing Address</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>{data?.billingAddressDetails?.addressLineOne}</Typography>
            <Typography variant='subtitle2'>{data?.billingAddressDetails?.addressLineTwo}</Typography>
            <Typography variant='subtitle2'>{`Landmark : ${data?.billingAddressDetails?.landmark}`}</Typography>
            <Typography variant='subtitle2'>{`Contact Person Name: ${data?.billingAddressDetails?.contactPerson}`}</Typography>
            <Typography variant='subtitle2'>{`Contact Person Phone: ${data?.billingAddressDetails?.phone}`}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

const OrderOverview = props => {
  useEffect(() => {
    console.log('===========Order overview data===============')
    console.log(props.data.data)
  }, [props.data])
  return (
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
            {renderStats(props?.data?.data)}
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0}>
        <CardHeader
          title='Addresses'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <OptionsMenu
              options={['Refresh', 'Share', 'Update']}
              iconButtonProps={{ size: 'small', className: 'card-more-options', sx: { color: 'text.secondary' } }}
            />
          }
        />
        <CardContent>{renderAddress(props?.data?.data)}</CardContent>
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
              {renderCustomerDetails(props?.data?.data)}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default OrderOverview

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import format from 'date-fns/format'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useEffect } from 'react'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCardWrapper = styled(Card)(() => ({
  '@media print': {
    boxShadow: 'none' // Remove boxShadow when printing
  }
}))

const PreviewCard = ({ data }) => {
  useEffect(() => {
    console.log('purchase order Preview Data')
    console.log(data)
  }, [data])
  // ** Hook
  const theme = useTheme()
  if (data) {
    return (
      <PreviewCardWrapper>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <img src='/images/logo.png' width={175} />
                  <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}></Typography>
                </Box>
                <Box>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    7, 1, Middle School Rd, Vishweshwarapura,
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Basavanagudi, Bengaluru, Karnataka 560004
                  </Typography>
                  <Typography variant='body2'>+91-72599 22444</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table sx={{ maxWidth: '320px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6' px={1}>
                          Purchase Order&emsp;
                        </Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>{` #${data.purchaseOrderId}`}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Issued:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>
                          {data.dateIssued ? format(new Date(data.dateIssued), 'do MMM yyyy, hh:mm:ss a') : null}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    {/* <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>{data.valid}</Typography>
                      </MUITableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider
          sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Customer Details:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {data.customeFullname}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {data.customerEmail}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}></Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Product Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.purchaseOrderItems &&
                data.purchaseOrderItems.map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{`Rs.${item.price}/-`}</TableCell>
                      <TableCell>{`${item.qty}`}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {/* {`${item.product.tax ? item.product.tax.taxLabel : ''} ${
                        item.product.tax ? parseFloat(item.product.tax.percent).toFixed(2) : ''
                      }%`} */}
                      </TableCell>
                      <TableCell>{`Rs.${item.rowTotal.toFixed(2)}/-`}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <CardContent sx={{ pt: 8 }}>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>Sub Total:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  {`Rs. ${data.subtotal}`}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Tax:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  {`Rs. ${data.taxAmount}`}
                </Typography>
              </CalcWrapper>
              {data.couponCode && (
                <CalcWrapper>
                  <Typography variant='body2'>Coupon Applied:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    {`${data.couponCode}`}
                  </Typography>
                </CalcWrapper>
              )}
              {data.couponDiscountAmount && (
                <CalcWrapper>
                  <Typography variant='body2'>Discount:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    {`Rs. ${data.couponDiscountAmount}`}
                  </Typography>
                </CalcWrapper>
              )}

              <CalcWrapper>
                <Typography variant='body2'>Grand Total:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  {`Rs. ${data.grandTotal}`}
                </Typography>
              </CalcWrapper>
              {/* <CalcWrapper>
                <Typography variant='body2'>Discount:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  $28
                </Typography>
              </CalcWrapper> */}
              {/* <CalcWrapper>
                <Typography variant='body2'>Tax:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  21%
                </Typography>
              </CalcWrapper>
              <Divider
                sx={{ mt: theme => `${theme.spacing(5)} !important`, mb: theme => `${theme.spacing(3)} !important` }}
              />
              <CalcWrapper>
                <Typography variant='body2'>Total:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  $1690
                </Typography>
              </CalcWrapper> */}
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: theme => `${theme.spacing(4.5)} !important`, mb: '0 !important' }} />

        {/* <CardContent>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            <strong>Note:</strong> {data.notes}
          </Typography>
        </CardContent> */}
      </PreviewCardWrapper>
    )
  } else {
    return null
  }
}

export default PreviewCard

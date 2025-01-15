import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ProductTable from 'src/views/apps/product/Table'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CardProduct from '../../product/CardProduct'
import ProductSelectTable from 'src/views/order/create/ProductSelectTable'
import { useDispatch, useSelector } from 'react-redux';


const StepProduct = ({ handleNext }) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order?.order)

  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={8}>
        <ProductSelectTable/>
        {/* <CardProduct/> */}
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Offer</Typography>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <TextField fullWidth sx={{ mr: 4 }} size='small' placeholder='Enter Promo Code' />
              <Button variant='outlined'>Apply</Button>
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Price Details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Subtotal
                </Typography>
                <Typography variant='subtitle'>{`Rs.${order?.subtotal}`}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Tax
                </Typography>
                <Typography variant='subtitle'>{`Rs.${order?.tax}`}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Coupon Discount
                </Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={MuiLink}
                  onClick={e => e.preventDefault()}
                  sx={{ display: 'block', fontWeight: 600, color: 'primary.main' }}
                >
                  Apply Coupon
                </Typography>
              </Box>
              {/* <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                  Delivery Charges
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ mr: 2, textDecoration: 'line-through', color: 'text.disabled' }}>
                    $5.00
                  </Typography>
                  <CustomChip size='small' skin='light' color='success' label='Free' />
                </Box>
              </Box> */}
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important' }} />
          <CardContent sx={{ py: theme => `${theme.spacing(3.5)} !important` }}>
            <Box
              sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ fontWeight: 600 }}>Grand Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>{`Rs.${order?.grandTotal}`}</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
          <Button fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
            Review Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StepProduct

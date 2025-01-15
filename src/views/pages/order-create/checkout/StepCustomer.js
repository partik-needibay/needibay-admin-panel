// ** MUI Imports
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
import PageHeader from 'src/@core/components/page-header'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Customer from '../../customer/Customer'
import CustomerTable from 'src/views/customer/view/CustomerTable'
import CustomerSelectTable from 'src/views/order/create/CustomerSelectTable'
import { useSelector } from 'react-redux'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const StepCustomer = ({ handleNext }) => {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
  const selectedCustomerId = useSelector(state => state.order?.order?.customerId)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <Box my={6}>
           {/*  <Grid container spacing={4}>
                <Grid item xs={12} lg={9}>
                    <PageHeader
                        title={<Typography variant='h6'>Customer List</Typography>}
                        subtitle={
                        <Typography variant='body2'>
                            Select a customer to create order! 
                        </Typography>
                        }
                    />

                </Grid>
                <Grid item xs={12} lg={3} display={'flex'} justifyContent={'flex-end'}>
                    <Box>
                        <Button variant='contained' onClick={handleNext}>
                            Create New Customer
                        </Button>
                    </Box>
                </Grid>
            </Grid> */}
            
        </Box>
        <CustomerSelectTable />
        <Grid container spacing={6}>
            <Grid item xs={12} lg={10}></Grid>
          <Grid item xs={12} lg={2}>
            <Box my={6} sx={{ display: 'flex', ...(breakpointMD ? { justifyContent: 'flex-end' } : {}) }}>
              <Button disabled={!selectedCustomerId} fullWidth={!breakpointMD} variant='contained' onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StepCustomer

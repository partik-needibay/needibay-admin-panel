// ** React Imports
import { useState } from 'react'

// ** MUI Imports

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import Slider from '@mui/material/Slider'
import Rating from '@mui/material/Rating'

//** Date picker imports */
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import Link from 'next/link'
import { Chip } from '@mui/material'
import ListWithCategory from 'src/views/components/list/ListWithCategory'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)
  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant='subtitle1' sx={{ mb: 2 }}>
                Filters
              </Typography>
              <CustomChip 
                skin='light'
                size='small'
                label='Clear All'
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 },
                  cursor: 'pointer'
                }}
              />
            </CardContent>
            <CardContent sx={{ my: 1 }}>
              <Box>
                <Typography variant='subtitle2'>
                  Active filters: <Chip label='ID 1-2' color='primary' variant='outlined' onDelete={handleDelete} />
                  <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
                  <Typography variant='subtitle2'>Add more filters</Typography>
                  <Box sx={{ mt: 5 }}>
                    <Box>
                      {/* Most frequent filter box */}
                      <Typography variant='caption'>ID:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexWrap: 'wrap' }}>
                        <Box width='45%' sx={{ mr: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                        <Typography variant='subtitle1'>to</Typography>
                        <Box width='44%' sx={{ ml: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {' '}
                      <Typography variant='caption'>Price: </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexWrap: 'wrap' }}>
                        <Box width='45%' sx={{ mr: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                        <Typography variant='subtitle1'>to</Typography>
                        <Box width='44%' sx={{ ml: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 5 }}>
                      {' '}
                      <Typography variant='caption'>Last Updated At: </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexWrap: 'wrap' }}>
                        <Box width='100%' sx={{ mt: 2 }}>
                          <DatePicker placeholder='none' />
                        </Box>
                        <Typography sx={{ mt: 2 }} variant='subtitle1'>
                          to
                        </Typography>
                        <Box width='100%' sx={{ mt: 2 }}>
                          <DatePicker placeholder='none' />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      {' '}
                      <Typography variant='caption'>Quantity: </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexWrap: 'wrap' }}>
                        <Box width='45%' sx={{ mr: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                        <Typography variant='subtitle1'>to</Typography>
                        <Box width='44%' sx={{ ml: 2 }}>
                          <TextField fullWidth size='small' variant='outlined' sx={{ mt: 2 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Typography>
              </Box>
            </CardContent>
            {/* <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', flexWrap: 'wrap' }}>
                <Box sx={{ mr: 1, my: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip label='Primary' color='primary' variant='outlined' onDelete={handleDelete} />
                </Box>
                <Box sx={{ mr: 1, my: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip label='Primary' color='primary' variant='outlined' onDelete={handleDelete} />
                </Box>
                <Box sx={{ mr: 1, my: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip label='test' color='primary' variant='outlined' onDelete={handleDelete} />
                </Box>
                <Box sx={{ mr: 1, my: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip label='test' color='primary' variant='outlined' onDelete={handleDelete} />
                </Box>
                <Box sx={{ mr: 1, my: 1, display: 'flex', alignItems: 'center' }}>
                  <Chip label='Primary' color='primary' variant='outlined' onDelete={handleDelete} />
                </Box>
              </Box>
            </CardContent> */}
            <CardContent>
              <Typography variant='subtitle2'>Product Categories</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <ListWithCategory />
            </CardContent>
            <CardContent>
              <Typography variant='subtitle2'>Min Order Quantity</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Slider defaultValue={[50, 100]} valueLabelDisplay='auto' aria-labelledby='range-slider' />
            </CardContent>
            <CardContent>
              <Typography variant='subtitle2'>Vendors</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <ListWithCategory />
            </CardContent>
            <CardContent>
              <Typography variant='subtitle2'>Inventory Stock</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Slider defaultValue={[10, 75]} valueLabelDisplay='auto' aria-labelledby='range-slider' />
            </CardContent>
            <CardContent>
              <Typography variant='subtitle2'>Per Unit Price Range</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Slider defaultValue={[50, 100]} valueLabelDisplay='auto' aria-labelledby='range-slider' />
            </CardContent>
            <CardContent>
              <Typography variant='subtitle2'>Per Unit Price Range</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box className='demo-space-y' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Rating defaultValue={5} name='size-large' size='large' />
                <Rating defaultValue={4} name='size-medium' />
                <Rating defaultValue={3} name='size-small' size='small' />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft

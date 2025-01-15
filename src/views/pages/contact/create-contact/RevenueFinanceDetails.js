// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { List, ListItem, ListItemIcon, ListItemText, TextField, Button, Typography } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'


// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

const furnishingArray = [
  'AC',
  'TV',
  'RO',
  'Bed',
  'WiFi',
  'Sofa',
  'Fridge',
  'Cupboard',
  'Microwave',
  'Dining Table',
  'Washing Machine'
]

const RevenueFinanceDetails = () => {
  // ** State
  const [furnishingDetails, setFurnishingDetails] = useState(['Fridge', 'AC', 'TV', 'Wifi'])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setFurnishingDetails(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={12} lg={12}>
        <PageHeader
          title={<Typography variant='h5'>Add Account Value</Typography>}
          subtitle={
            <Typography variant='body2'>Add expected financial data about the account on deal</Typography>
          }
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <List>
          <ListItem>
            <ListItemIcon sx={{ width: 250 }}>Expected Revenue Generation</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='$10,000' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 250 }}>Open Deal Value</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='$13,000' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 250 }}>Offer Value With Discount</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='$10,000' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 250 }}>Bottom Thresold </ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='$9000' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 250 }}>Closing Target</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='31st March 2023' fullWidth />
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default RevenueFinanceDetails

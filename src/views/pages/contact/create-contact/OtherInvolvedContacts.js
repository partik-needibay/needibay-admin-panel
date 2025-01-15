// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { Accordion, List, ListItem, ListItemIcon, ListItemText, TextField, Button } from '@mui/material'
import PageHeader from 'src/@core/components/page-header'



// ** Custom Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

const data = [
  {
    value: 'sale',
    isSelected: true,
    title: 'Sell the property',
    content: (
      <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
        Post your property for sale.
        <br />
        Unlimited free listing.
      </Typography>
    )
  },
  {
    value: 'rent',
    title: 'Rent the property',
    content: (
      <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
        Post your property for rent.
        <br />
        Unlimited free listing.
      </Typography>
    )
  }
]

const OtherInvolvedContacts = () => {
  const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** State
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

  // ** Hook
  const theme = useTheme()

  const icons = [
    {
      icon: 'mdi:home-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:wallet-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]

  const handleRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
    } else {
      setSelectedRadio(prop.target.value)
    }
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} lg={10}>
        <PageHeader
              title={<Typography variant='h5'>Add Other Key Account Decision Makers</Typography>}
              subtitle={
              <Typography variant='body2'>
                  Add one or more team member & decision maker responsible to close the deal!
              </Typography>
              }
          />
      </Grid>
      <Grid item xs={12} lg={2}>
        <Button size='small' variant='outlined'>Save & Add New</Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <List>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>First Name</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='John' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Last Name</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='Doe' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Email</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='Doe' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Phone</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='Phone' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Location</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='California' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Office</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='California Headquarter' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>Designation</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='Chief Marketing Officer' fullWidth />
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ width: 175 }}>LinkedIn Profile</ListItemIcon>
            <ListItemText>
              <TextField size='small' placeholder='https://linkedin.com/john_doe' fullWidth />
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default OtherInvolvedContacts

// ** React Imports
import { useState } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Custom Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import {
  Accordion,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Switch,
  Select,
  MenuItem,
  Typography
} from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

const data = [
  {
    value: 'individual',
    title: 'Contact Details',
    content: 'Add a contact as an individual.'
  },
  {
    value: 'organization',
    isSelected: true,
    title: 'Account Info',
    content: 'Add account information for the contact'
  }
]

const PaymentMethods = () => {
  const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** States
  const [showValues, setShowValues] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

  // ** Hook
  const theme = useTheme()

  const icons = [
    {
      icon: 'mdi:office-building-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:crown-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    },
    {
      icon: 'mdi:briefcase-outline',
      iconProps: { fontSize: '2rem', style: { marginBottom: 4 }, color: theme.palette.text.secondary }
    }
  ]

  const handleTogglePasswordView = () => {
    setShowValues(!showValues)
  }

  const handleMousePasswordView = event => {
    event.preventDefault()
  }

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
          title={<Typography variant='h5'>Payment Method Details</Typography>}
          subtitle={<Typography variant='body2'>Payment Methods, UPI, To Mobile, Cash</Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <List>
          <>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>UPI</ListItemIcon>
              <ListItemText>
                <TextField size='small' placeholder='(Eg: xyz@okhdfcbank)' fullWidth />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Payment to Mobile</ListItemIcon>
              <ListItemText>
                <TextField size='small' placeholder='Mobile No.' fullWidth />
              </ListItemText>
            </ListItem>
          </>
        </List>
      </Grid>
    </Grid>
  )
}

export default PaymentMethods

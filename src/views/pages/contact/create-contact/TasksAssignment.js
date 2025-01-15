// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Switch
} from '@mui/material'
import PageHeader from 'src/@core/components/page-header'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props

  return (
    <TextField
      fullWidth
      size='small'
      {...props}
      inputRef={ref}
      label={label || ''}
      {...(readOnly && { inputProps: { readOnly: true } })}
    />
  )
})

const TasksAssignment = ({ popperPlacement }) => {
  // ** States
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(new Date())
  const [dateTime, setDateTime] = useState(new Date())

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} lg={10}>
        <PageHeader
          title={<Typography variant='h5'>Create & Assign Tasks</Typography>}
          subtitle={<Typography variant='body2'>Tasks assignment with due dates</Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <List>
          <>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Task Name</ListItemIcon>
              <ListItemText>
                <TextField size='small' placeholder='Send Product Pitch Deck' fullWidth />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Is Executed</ListItemIcon>
              <ListItemText>
                <Switch />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Schedule At</ListItemIcon>
              <ListItemText>
                <DatePicker
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  selected={dateTime}
                  id='date-time-picker'
                  dateFormat='MM/dd/yyyy h:mm aa'
                  popperPlacement={popperPlacement}
                  onChange={date => setDateTime(date)}
                  customInput={<CustomInput label='Date & Time' />}
                />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ width: 175 }}>Copy Notification Send to Email</ListItemIcon>
              <ListItemText>
                <TextField size='small' placeholder='gaurav@stackwit.com' fullWidth />
              </ListItemText>
            </ListItem>
          </>
        </List>
      </Grid>
    </Grid>
  )
}

export default TasksAssignment

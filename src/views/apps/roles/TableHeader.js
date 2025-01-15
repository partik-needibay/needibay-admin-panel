// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { plan, handlePlanChange, handleToggleFilter, handleFilter, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center' }}>
        <FormControl size='small' sx={{ px: 2 }}>
          <InputLabel id='plan-select'>Actions</InputLabel>
          <Select
            size='small'
            value={plan}
            id='select-plan'
            label='Actions'
            labelId='plan-select'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Actions' }}
          >
            <MenuItem value=''>Actions</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size='small'
          value={value}
          placeholder='Search'
          sx={{ mr: 6 }}
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <Box>
        <IconButton aria-label='capture screenshot' color='secondary' size='large'>
          <Icon icon='solar:settings-linear' style={{ transform: 'scaleY(-1)' }} />
        </IconButton>

        <IconButton onClick={handleToggleFilter} aria-label='capture screenshot' color='secondary' size='large'>
          <Icon icon='tabler:filter' />
        </IconButton>

        <IconButton aria-label='capture screenshot' color='secondary' size='large'>
          <Icon icon='mdi:export-variant' />
        </IconButton>

        <IconButton aria-label='capture screenshot' color='secondary' size='large'>
          <Icon icon='mdi:export-variant' style={{ transform: 'scaleY(-1)' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TableHeader

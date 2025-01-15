// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled, useTheme } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AutocompleteComponent from 'src/layouts/components/Autocomplete'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogHsnCode = ({open}) => {
  // ** States
  const [show, setShow] = useState(open)
  const [searchValue, setSearchValue] = useState('')

  const handleClose = () => {

  }

  return (
    <>
      <Button variant='outlined' onClick={() => setShow(true)}>
        Add New
      </Button>
      <Card>
        <Dialog
          fullWidth
          open={show}
          maxWidth='sm'
          scroll='body'
          onClose={handleClose}
          onBackdropClick={handleClose}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Box sx={{ top: 0, width: '100%', position: 'sticky' }}>
              <TextField
                size='small'
                fullWidth
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                inputRef={input => {
                  if (input) {
                    if (show) {
                      input.focus()
                    } else {
                      input.blur()
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ color: 'text.primary' }}>
                      <Icon icon='mdi:magnify' />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position='end'
                      onClick={() => setShow(false)}
                      sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                    >
                      <Typography sx={{ mr: 2.5, color: 'text.disabled' }}>[esc]</Typography>
                      <IconButton size='small' sx={{ p: 1 }} onClick={handleClose}>
                        <Icon icon='mdi:close' fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box>

            </Box>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}></DialogActions>
        </Dialog>
      </Card>
    </>
  )
}

export default DialogHsnCode

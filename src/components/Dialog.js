import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { ClickAwayListener } from '@mui/material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function CustomizedDialogs({ title, content, open, handleClose }) {
  return (
    <div>
      <ClickAwayListener onClickAway={handleClose}>
        <BootstrapDialog onClose={handleClose} open={open}>
          <DialogTitle onClose={handleClose}>{title}</DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>{content}</DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose} color='primary'>
              Save changes
            </Button>
          </DialogActions> */}
        </BootstrapDialog>
      </ClickAwayListener>
    </div>
  )
}

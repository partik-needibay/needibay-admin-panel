import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import AccordianIcon from 'src/@core/components/icon'

const CustomerAddressTable = ({ addresses }) => {
  const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }))

  const AccordionSummary = styled(props => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    }
  }))

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
  }))

  useEffect(() => {
    console.log("==================================")
    console.log(addresses)
  },[addresses])

  return (
    <>
      <Card border='2px solid red' sx={{ paddingBlock: '2rem', paddingInline: '2rem' }}>
        <>
          <Accordion defaultExpanded>
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
              sx={{ marginTop: '40px', marginLeft: '0px' }}
            >
              <Typography>Billing Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {addresses && addresses
                  ?.filter(o => o.addressType == 1)
                  .map(address => {
                    return <Grid item xs={4} p={2}>
                      <Card variant='outlined'>
                        <CardContent
                          sx={{
                            padding: '0px !important',
                            paddingLeft: '1rem !important',
                            paddingBlock: '0.9rem !important',
                            fontSize: '1rem'
                          }}
                        >
                          {`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.country} ${address.postalCode}`}
                        </CardContent>
                      </Card>
                    </Grid>
                  })}
                  {addresses && addresses
                  ?.filter(o => o.addressType == 1)
                  .map(address => {
                    return <Grid item xs={4} p={2}>
                      <Card variant='outlined'>
                        <CardContent
                          sx={{
                            padding: '0px !important',
                            paddingLeft: '1rem !important',
                            paddingBlock: '0.9rem !important',
                            fontSize: '1rem'
                          }}
                        >
                          {`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.country} ${address.postalCode}`}
                        </CardContent>
                      </Card>
                    </Grid>
                  })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded >
            <AccordionSummary
              id='panel-header-1'
              aria-controls='panel-content-1'
              expandIcon={<AccordianIcon icon='mdi:chevron-down' />}
              sx={{ marginTop: '40px', marginLeft: '0px' }}
            
            >
              <Typography>Shipping Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {addresses?.length > 0 && addresses
                  ?.filter(o => o.addressType == 2)
                  .map(address => {
                    return <Grid item xs={4} p={2}>
                      <Card variant='outlined'>
                        <CardContent
                          sx={{
                            padding: '0px !important',
                            paddingLeft: '1rem !important',
                            paddingBlock: '0.9rem !important',
                            fontSize: '1rem'
                          }}
                        >
                          {`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.country} ${address.postalCode}`}
                        </CardContent>
                      </Card>
                    </Grid>
                  })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      </Card>
    </>
  )
}

export default CustomerAddressTable

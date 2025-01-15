import React from 'react'
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
import ContactDetailsTable from './ContactDetailsTable'

const KycDetails = () => {
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

  const addresses = [
    {
      id: '1',
      type: 'VendorEntity',
      Name: 'Vendor',
      Businessname: 'Nike',
      Email: 'Vendor@gmail.com',
      country: 'India',
      postalCode: '12345'
    },
    {
      id: '2',
      type: 'contactname',
      contact: <ContactDetailsTable />
    },
    {
      id: '3',
      type: 'bankdetails',
      Name: 'Bank of baroda',
      Branch: 'bengalore',
      Accnum: '1234567654321',
      acctype: 'current',
      postalCode: '12345'
    }
    // ... additional addresses
  ]
  const panelIds = addresses.map((address, index) => `panel${index}`)
  const [expanded, setExpanded] = React.useState(
    panelIds.reduce((acc, panelId) => {
      console.log('panelIds', panelId)
      console.log('acc', acc)
      acc[panelId] = true
      return acc
    }, {})
  )
  console.log(expanded, 'sss')

  const handleChange = panel => (event, newExpanded) => {
    console.log('panel', panel)
    console.log('newExpanded', newExpanded)
    setExpanded(prevExpand => ({
      ...prevExpand,
      [panel]: newExpanded
    }))
  }

  return (
    <>
      {/* {addresses.map(address => (
                <div key={address.id}>
                    <Typography variant="subtitle1" gutterBottom>
                        {`${address.type} Address`}
                    </Typography>
                    <Typography>{`${address.street}, ${address.city}, ${address.country} ${address.postalCode}`}</Typography>
                    Add more details if needed
                    <br />
                </div>
            ))} */}
      <Card border='2px solid red' sx={{ paddingBlock: '2rem', paddingInline: '2rem' }}>
        {addresses.map((address, index) => (
          <>
            <Accordion expanded={expanded[`panel${index}`]} onChange={handleChange(`panel${index}`)}>
              <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                <Typography>{`${address.type} Address`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Grid container >
                                        <Grid item xs={4} p={2}>

                                            <Card variant="outlined" >
                                                <CardContent sx={{ padding: "0px !important", paddingLeft: "1rem !important", paddingBlock: "0.9rem !important", fontSize: "1rem" }}>

                                                    {`${address.street}, ${address.city}, ${address.country} ${address.postalCode}`}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4} p={2}>

                                            <Card variant="outlined"  >
                                                <CardContent sx={{ padding: "0px !important", paddingLeft: "1rem !important", paddingBlock: "0.9rem !important", fontSize: "1rem", }}>

                                                    {`${address.street}, ${address.city}, ${address.country} ${address.postalCode}`}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4} p={2}>

                                            <Card variant="outlined"  >
                                                <CardContent sx={{ padding: "0px !important", paddingLeft: "1rem !important", paddingBlock: "0.9rem !important", fontSize: "1rem" }}>

                                                    {`${address.street}, ${address.city}, ${address.country} ${address.postalCode}`}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid> */}
                {address.type === 'contactname' ? (
                  address.contact
                ) : address.type === 'bankdetails' ? (
                  <Grid container>
                    <Grid item xs={6} p={2}>
                      <Card variant='outlined'>
                        <CardContent
                          sx={{
                            padding: '0px !important',
                            paddingLeft: '1rem !important',
                            paddingBlock: '0.9rem !important',
                            fontSize: '1rem'
                          }}
                        >
                          {`${address.Name},  ${address.Branch},${address.Accnum}, ${address.acctype} ${address.postalCode}`}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs={6} p={2}>
                      <Card variant='outlined'>
                        <CardContent
                          sx={{
                            padding: '0px !important',
                            paddingLeft: '1rem !important',
                            paddingBlock: '0.9rem !important',
                            fontSize: '1rem'
                          }}
                        >
                          {`${address.Name},  ${address.Businessname},${address.Email}, ${address.country} ${address.postalCode}`}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </Card>
    </>
  )
}

export default KycDetails

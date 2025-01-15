// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import MuiStep from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

// ** Step Components
import TasksAssignment from 'src/views/pages/contact/create-contact/TasksAssignment'
import Documents from 'src/views/pages/contact/create-contact/Documents'
import OtherInvolvedContacts from 'src/views/pages/contact/create-contact/OtherInvolvedContacts'
import ContactDetails from 'src/views/pages/contact/create-contact/ContactDetails'
import RevenueFinanceDetails from 'src/views/pages/contact/create-contact/RevenueFinanceDetails'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import AccountDetails from './AccountDetails'
import Notes from './Notes'
import BankDetails from './BankDetails'
import PageHeader from 'src/@core/components/page-header'
import BillingAddressCard from '../../account-settings/billing/BillingAddressCard'
import AddressCard from './AddressCard'

const steps = [
  {
    title: 'Vendor Entity',
    subtitle: 'Manufacturer Company Details',
    icon: 'mdi:account-outline'
  },
  {
    title: 'Contact Person',
    subtitle: 'Add one or more contact person details',
    icon: 'mdi:account-outline'
  },
  {
    title: 'Address',
    subtitle: 'Add one or more contact person details',
    icon: 'mdi:account-outline'
  },
  {
    icon: 'mdi:home-outline',
    title: 'Bank Account Details',
    subtitle: 'One or More Users'
  },
  {
    title: 'Documents',
    subtitle: 'Upload PAN, GST, etc.',
    icon: 'mdi:map-marker-outline'
  },
  {
    title: 'Notes',
    icon: 'mdi:currency-usd',
    subtitle: 'Important notes about this contact'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(4)
  },
  '& .MuiStepLabel-root': {
    padding: 0
  }
}))

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  minWidth: 300,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('lg')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const PropertyListingWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [completedStep, setCompletedStep] = useState(0)

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleStepComplete = step => () => {
    setCompletedStep(step)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <AccountDetails
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      case 1:
        return (
          <ContactDetails
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      case 2:
        return (
          <AddressCard
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      case 3:
        return (
          <BankDetails
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      case 4:
        return (
          <Documents
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      case 5:
        return (
          <Notes
            activeStep={activeStep}
            steps={steps}
            handlePrev={handlePrev}
            onComplete={handleStepComplete(step)}
            handleNext={handleNext}
          />
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon='mdi:arrow-left' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={stepCondition ? 'success' : 'primary'}
          {...(!stepCondition ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
          onClick={() => (stepCondition ? alert('Submitted..!!') : handleNext())}
        >
          {stepCondition ? 'Submit' : 'Save & Next'}
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={12} xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Vendor Onboarding Form</Typography>}
            subtitle={
              <Typography variant='body2'>Fill up all the details to get onboarded as a Vendor at NeediBay</Typography>
            }
          />
        </Grid>
        <Grid item lg={12} xs={12}>
          <Card sx={{ display: 'flex', minHeight: 700, flexDirection: { xs: 'column', lg: 'row' } }}>
            <StepperHeaderContainer>
              <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'pointer' } }}>
                <Stepper connector={<></>} activeStep={activeStep} orientation='vertical'>
                  {steps.map((step, index) => {
                    return (
                      <Step
                        key={index}
                        onClick={() => (index < activeStep ? setActiveStep(index) : null)}
                        sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                      >
                        <StepLabel StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
              `
            </StepperHeaderContainer>
            <div style={activeStep == 2 ? { width: '100%' } : { width: 'inherit' }}>
              <CardContent>
                <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                  {renderContent()}
                  {/* {renderFooter()} */}
                </Box>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PropertyListingWizard

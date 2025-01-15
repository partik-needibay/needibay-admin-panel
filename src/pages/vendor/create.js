// ** Demo Components Imports
import CreateContact from 'src/views/pages/contact/create-contact'

// ** Custom Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const WizardExamples = () => {
  return (
    <DatePickerWrapper>
      <CreateContact />
    </DatePickerWrapper>
  )
}

export default WizardExamples

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Preview from 'src/views/apps/purchaseOrder/preview/Preview'

const InvoicePreview = ({ id }) => {
  return <Preview id={id} />
}

export const getServerSideProps = async context => {
  console.log(context.params.id)
  return {
    props: {
      id: context.params.id
    }
  }
}

export default InvoicePreview

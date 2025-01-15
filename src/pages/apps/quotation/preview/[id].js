// ** Demo Components Imports
import { useEffect } from 'react'
import Preview from 'src/views/apps/quotation/preview/Preview'

const QuotationPreview = ({ id }) => {
  useEffect(() => {
    console.log(id)
  }, [id])
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

export default QuotationPreview

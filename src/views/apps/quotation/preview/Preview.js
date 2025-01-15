// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/quotation/preview/PreviewCard'
import PreviewActions from 'src/views/apps/quotation/preview/PreviewActions'
import AddPaymentDrawer from 'src/views/apps/quotation/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/quotation/shared-drawer/SendInvoiceDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuotationById } from 'src/store/apps/quotations'
import usePrint from 'src/@core/hooks/usePrint'

const QuotationPreview = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const doPrint = usePrint()
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id === 'view') {
      // ..
    } else {
      dispatch(fetchQuotationById({ id }))
        .then(response => {
          if (response.meta.requestStatus === 'fulfilled') {
            // Handle any other success operations here
          } else {
            // Handle error operations here
          }
        })
        .catch(e => {
          alert(e.getMessage())
        })
    }
  }, [id, dispatch])
  const store = useSelector(state => state.quotation?.quotationPreview)
  console.log(store)
  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const triggerPrint = useCallback(() => {
    doPrint('quotation-preview')
  }, [doPrint])

  if (store?.data) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12} id='quotation-preview'>
            <PreviewCard data={store?.data} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={id}
              triggerPrint={triggerPrint}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
            />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href='/apps/invoice/list'>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default QuotationPreview

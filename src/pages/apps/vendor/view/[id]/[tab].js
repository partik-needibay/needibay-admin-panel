// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/vendor/view/UserViewPage'

const UserView = ({ tab, id, invoiceData }) => {
  return <UserViewPage tab={tab} id={id} invoiceData={invoiceData} />
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = res.data.allData

  return {
    props: {
      invoiceData,
      tab: params?.tab,
      id: params?.id
    }
  }
}

export default UserView
